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
// import { usePathname } from "next/navigation";
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
  const isPro = await checkSubscription();
  console.log(isPro);
  return { userInfo: user, orgId, isPro };
};

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
  try {
    const response = await fetch(
      `${file.url}`
    );
    console.log("on upload complete: ", response.status);
    if (!response.ok) {
      throw new Error("Failed to fetch file");
    }
    const blob = await response.blob();

    const loader = new PDFLoader(blob) || new TextLoader(blob);

    const pageLevelDocs = await loader.load();

    const pagesAmt = pageLevelDocs.length;

    console.log("CHECKING PAGES");
    console.log(pagesAmt);
    // Check if the pages amount exceeds the limit for the subscription plan
    const isPro = metadata.isPro;

    // const isPageLimitExceeded = pagesAmt > 50;
    const maxPageLimit = isPro ? 50 : 15;

    const isPageLimitExceeded = pagesAmt > maxPageLimit;
    console.log("PAGE CHECK Failed:", isPageLimitExceeded);

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
      });

      console.log("2: File created");
      console.log(createdFile);
      const fileId = await nile.db("file").where({
        key: file.key,
        tenant_id: metadata.orgId,
      });
      console.log(fileId);
      try {
        for (const doc of pageLevelDocs) {
          console.log(doc);
          const txtPath = doc.metadata.loc.pageNumber;
          const text = doc.pageContent;
          console.log(text);
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
          console.log(embeddingsArrays);
          const batchSize = 100;
          let batch: any = [];
          for (let idx = 0; idx < chunks.length; idx++) {
            const chunk = chunks[idx];
            console.log(chunk);
            const vector = {
              id: `${fileId[0].id}_${idx}`,
              values: embeddingsArrays[idx],
              metadata: {
                ...chunk.metadata,
                loc: JSON.stringify(chunk.metadata.loc),
                pageContent: chunk.pageContent,
                txtPath: txtPath,
                filter: `${fileId[0].id}`,
              },
            };
            console.log(vector);

            batch = [...batch, vector];
            if (batch.length === batchSize || idx === chunks.length - 1) {
              console.log(batch);
              console.log(batch[0].values);

              for (const vector of batch) {
                const uuid = vector.id.split("_")[0];
                await nile.db("file_embedding").insert({
                  file_id: fileId[0].id,
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
          //   Log the number of vectors updated just for verification purpose
          console.log(`Database index updated with ${chunks.length} vectors`);
          await nile
            .db("file")
            .where({
              id: fileId[0].id,
              tenant_id: metadata.orgId,
            })
            .update({ isIndex: true });
        }
      } catch (err) {
        console.log("error: Error in upserting to database ", err);
        return "Embedding FAILED";
      }
      return "SUCCESS";
    } else {
      return "LIMIT EXCEEDED";
    }
  } catch (err) {
    return "UPLOAD FAILED";
  }
};

export const ourFileRouter = {
  freePlanUploader: f({
    pdf: { maxFileSize: "4MB" },
  })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  proPlanUploader: f({
    pdf: { maxFileSize: "16MB" },
  })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
