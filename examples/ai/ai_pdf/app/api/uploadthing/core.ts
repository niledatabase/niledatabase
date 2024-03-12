import { createUploadthing, type FileRouter } from "uploadthing/next";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";

import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { currentTenantId } from "@/lib/tenent-id";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { cookies } from "next/headers";
import { checkSubscription } from "@/lib/subscription";
import { MAX_PRO_PAGES, MAX_FREE_PAGES, MAX_FREE_MB, MAX_PRO_MB } from "@/constants/limits";
import { revalidatePath } from 'next/cache'

const f = createUploadthing();

const middleware = async () => {
  configureNile(cookies().get("authData"), null);
  console.log(nile.userId);
  const user = await nile.db("users.users").where({
    id: nile.userId,
  });
  console.log("user in middleware:", user);
  if (!user) throw new Error("Unauthorized");
  const number = await currentTenantId();
  console.log("tenant in middleware:", number);
  const orgId = number;
  const isPro = await checkSubscription(orgId);
  console.log("isPro: ", isPro);
  return { userInfo: user, orgId, isPro };
};

function checkTime(startTime: [number, number]) {
  const [ms, nanos] = process.hrtime(startTime);
  const elapsedSec = ms * 1000 + nanos / 1000000;
  if (elapsedSec > 12000) {
    throw new Error("Timeout");
  }
}

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    key: string;
    name: string;
    url: string;
  };
}) => {
  console.log("1: On upload complete. Trying to get file: ", file.key);
  console.log("file url", file.url);

  const startTime = process.hrtime();
  try {
    const response = await fetch(
      `${file.url}`
    );
    console.log("on upload complete: ", response.status);
    if (!response.ok) {
      return ("FAILED TO GET FILE");
    }
    const blob = await response.blob();

    const loader = new PDFLoader(blob) || new TextLoader(blob);

    const pageLevelDocs = await loader.load();

    // Check if the pages amount exceeds the limit for the subscription plan
    const maxPageLimit = metadata.isPro ? MAX_PRO_PAGES : MAX_FREE_PAGES;
    const pagesAmt = pageLevelDocs.length;

    if (pagesAmt === 0) {
      return "PARSE FAILED";
    }

    const isPageLimitExceeded = pagesAmt > maxPageLimit;

    console.log("PAGE CHECK result: ", !isPageLimitExceeded, " number of pages: ", pagesAmt, " page limit: ", maxPageLimit);

    if (!isPageLimitExceeded) {
      const createdFile = await nile.db("file").insert({
        tenant_id: metadata.orgId,
        url: `${file.url}`,
        key: file.key,
        user_id: metadata.userInfo[0].id,
        user_name: metadata.userInfo[0].name,
        user_picture: metadata.userInfo[0].picture,
        isIndex: false,
        name: file.name,
        pageAmt: pagesAmt,
      }).returning("id");

      const fileId = createdFile[0].id;

      console.log("File stored in Nile with ID:" + fileId);
      try {
        for (const doc of pageLevelDocs) {
          checkTime(startTime);
          const txtPath = doc.metadata.loc.pageNumber;
          const text = doc.pageContent;
          const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
          });
          //Split text into chunks (documents)
          const chunks = await textSplitter.createDocuments([text]);
          console.log(`Total chunks: ${chunks.length}`);
          console.log("Generating AI embeddings during upload here:");
          const modelName = process.env.OPENAI_EMBEDDING_MODEL_NAME || "text-embedding-3-small";
          const embeddingsArrays = await new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY,
            dimensions: +(process.env.OPENAI_EMBEDDING_DIMENSIONS || 1024),
            modelName: modelName,
          }).embedDocuments(
            chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " "))
          );
          const batchSize = 100;
          let batch: any = [];
          for (let idx = 0; idx < chunks.length; idx++) {
            const chunk = chunks[idx];
            const vector = {
              id: `${fileId}_${idx}`,
              values: embeddingsArrays[idx],
              metadata: {
                ...chunk.metadata,
                loc: JSON.stringify(chunk.metadata.loc),
                pageContent: chunk.pageContent,
                txtPath: txtPath,
                filter: `${fileId}`,
              },
            };

            batch = [...batch, vector];
            if (batch.length === batchSize || idx === chunks.length - 1) {
              for (const vector of batch) {
                const uuid = vector.id.split("_")[0];
                await nile.db("file_embedding").insert({
                  file_id: fileId,
                  tenant_id: metadata.orgId,
                  embedding_api_id: uuid,
                  embedding: JSON.stringify(vector.values),
                  pageContent: JSON.stringify(vector.metadata.pageContent),
                  location: JSON.stringify(vector.metadata.loc),
                });
              }
              batch = [];
            }
          }
        }
        
        console.log(`Database index updated with  vectors`);
        await nile
          .db("file")
          .where({
            id: fileId,
            tenant_id: metadata.orgId,
          })
          .update({ isIndex: true });
      } catch (err) {
        console.log("error: Error in updating file status in Nile", err);
        return "EMBEDDING FAILED";
      }
      // trigger re-render of file list, since the new file exists
      revalidatePath(`/dashboard/organization/${metadata.orgId}`);
      return "SUCCESS";
    } else {
      return "LIMIT EXCEEDED";
    }
  } catch (err) {
    return "UPLOAD FAILED";
  } finally {
    console.log("Asking for re-render of file list");
    // trigger re-render of file list
    revalidatePath(`/dashboard/organization/${metadata.orgId}`);
  }
};

export const ourFileRouter = {
  freePlanUploader: f({
    pdf: { maxFileSize: MAX_FREE_MB },
  })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  proPlanUploader: f({
    pdf: { maxFileSize: MAX_PRO_MB },
  })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
