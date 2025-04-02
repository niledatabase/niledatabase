import { createUploadthing, type FileRouter } from "uploadthing/next";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";

import nile, { configureNile } from "@/lib/NileServer";
import { getUserToken, getUserId, getUserName } from "@/lib/AuthUtils";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { cookies } from "next/headers";
import { checkSubscription } from "@/lib/subscription";
import {
  MAX_PRO_PAGES,
  MAX_FREE_PAGES,
  MAX_FREE_MB,
  MAX_PRO_MB,
} from "@/constants/limits";
import { revalidatePath } from "next/cache";
import { currentTenantId } from "@/lib/tenent-id";
import { User } from "@niledatabase/server";

export const maxDuration = 60;

const f = createUploadthing();

//@ts-ignore
const middleware = async ({ req, files }) => {
  nile.api.headers = new Headers({ cookie: (await cookies()).toString() });
  const user = await nile.api.users.me();
  if (!user || user instanceof Request) throw new Error("Unauthorized");
  const orgId = await currentTenantId(); // extracting tenant id from the "referer" header. the alternative is to introduce tenant-id cookie
  const isPro = await checkSubscription(orgId);
  console.log("isPro: ", isPro, " orgId: ", orgId, user);
  return { userInfo: user as User, orgId, isPro };
};

function checkTime(startTime: [number, number]) {
  const [ms, nanos] = process.hrtime(startTime);
  const elapsedSec = ms * 1000 + nanos / 1000000;
  if (elapsedSec > maxDuration * 1000 - 500) {
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
  console.log("metadata in onUploadComplete:", JSON.stringify(metadata));
  const tenantNile = await configureNile(metadata.orgId);
  console.log("1: On upload complete. Trying to get file: ", file.key);
  console.log("file url", file.url);

  const startTime = process.hrtime();
  try {
    const response = await fetch(`${file.url}`);
    console.log("on upload complete: ", response.status, response.ok);
    if (!response.ok) {
      return "FAILED TO GET FILE";
    }
    const blob = await response.blob();

    console.log(blob.size);
    const loader = new PDFLoader(blob) || new TextLoader(blob);

    console.log("attempting to load", loader);
    const pageLevelDocs = await loader.load().catch((e) => {
      console.log(e, "did this fail");
    });
    if (!pageLevelDocs) {
      console.log("failed to load file");
      return "FAILED TO LOAD FILE";
    }

    // Check if the pages amount exceeds the limit for the subscription plan
    const maxPageLimit = metadata.isPro ? MAX_PRO_PAGES : MAX_FREE_PAGES;
    const pagesAmt = pageLevelDocs.length;

    console.log("parsing", pagesAmt, pageLevelDocs);
    if (pagesAmt === 0) {
      return "PARSE FAILED";
    }

    const isPageLimitExceeded = pagesAmt > maxPageLimit;

    console.log(
      "PAGE CHECK result: ",
      !isPageLimitExceeded,
      " number of pages: ",
      pagesAmt,
      " page limit: ",
      maxPageLimit
    );

    console.log([
      metadata.orgId,
      `${file.url}`,
      file.key,
      getUserId(metadata.userInfo),
      getUserName(metadata.userInfo),
      false,
      file.name,
      pagesAmt,
    ]);
    if (!isPageLimitExceeded) {
      const createdFile = await tenantNile.db.query(
        `INSERT INTO file (tenant_id, url, key, user_id, user_name, "isIndex", name, "pageAmt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [
          metadata.orgId,
          `${file.url}`,
          file.key,
          metadata.userInfo.id,
          metadata.userInfo.name,
          false,
          file.name,
          pagesAmt,
        ]
      );

      const fileId = createdFile.rows[0].id;

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
          const modelName =
            process.env.OPENAI_EMBEDDING_MODEL_NAME || "text-embedding-3-small";
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
                await tenantNile.db.query(
                  `INSERT INTO file_embedding (file_id, tenant_id, embedding_api_id, embedding, "pageContent", location) VALUES ($1, $2, $3, $4, $5, $6)`,
                  [
                    fileId,
                    metadata.orgId,
                    uuid,
                    JSON.stringify(vector.values),
                    JSON.stringify(vector.metadata.pageContent),
                    JSON.stringify(vector.metadata.loc),
                  ]
                );
              }
              batch = [];
            }
          }
        }

        console.log(`Database index updated with  vectors`);
        await tenantNile.db.query(
          `UPDATE file SET "isIndex" = $1 WHERE id = $2`,
          [true, fileId]
        );
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
    console.log("error: Error in uploading file", err);
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
