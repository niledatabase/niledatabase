import { configureNile } from "@/lib/NileServer";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Index route uploading and embedding:" + JSON.stringify(data));
    const tenantNile = await configureNile(data.file.tenant_id);
    try {
      const response = await fetch(`${data.file.url}`);
      console.log("Index api getting file: " + response.status);
      const blob = await response.blob();
      const loader = new PDFLoader(blob) || new TextLoader(blob);
      const pageLevelDocs = await loader.load();
      const pagesAmt = pageLevelDocs.length;
      console.log("Index API Found " + pagesAmt + " pages in the document");
      if (pagesAmt === 0) {
        return new NextResponse(
          "Failed to parse document or no text found. Try something else.",
          { status: 400 }
        );
      }
      try {
        for (const doc of pageLevelDocs) {
          const txtPath = doc.metadata.loc.pageNumber;
          const text = doc.pageContent;
          const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
          });
          const chunks = await textSplitter.createDocuments([text]);
          console.log(`Total chunks: ${chunks.length}`);
          console.log("Index API starting embeddings generation");
          const modelName =
            process.env.OPENAI_EMBEDDING_MODEL_NAME || "text-embedding-3-small";
          const embeddingsArrays = await new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: modelName,
            dimensions: +(process.env.OPENAI_EMBEDDING_DIMENSIONS || 1024),
          }).embedDocuments(
            chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " "))
          );
          const batchSize = 100;
          let batch: any = [];
          for (let idx = 0; idx < chunks.length; idx++) {
            const chunk = chunks[idx];
            const vector = {
              id: `${data.file.id}_${idx}`,
              values: embeddingsArrays[idx],
              metadata: {
                ...chunk.metadata,
                loc: JSON.stringify(chunk.metadata.loc),
                pageContent: chunk.pageContent,
                txtPath: txtPath,
                filter: `${data.file.id}`,
              },
            };

            batch = [...batch, vector];
            if (batch.length === batchSize || idx === chunks.length - 1) {
              for (const vector of batch) {
                const uuid = vector.id.split("_")[0];
                await tenantNile.db.query(
                  `INSERT INTO file_embedding (file_id, tenant_id, embedding_api_id, embedding, "pageContent", location) VALUES ($1, $2, $3, $4, $5, $6)`,
                  [
                    data.file.id,
                    data.file.tenant_id,
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
        console.log(`Database index updated with vectors`);
        await tenantNile.db.query(
          `UPDATE file SET "isIndex" = $1 WHERE id = $2`,
          [true, data.file.id]
        );
      } catch (err) {
        console.log(
          "error: Error in generating embeddings and updating database ",
          err
        );
        return new NextResponse(
          "Error in generating embeddings and/or updating database " + err,
          {
            status: 400,
          }
        );
      }
    } catch (err) {
      console.log(err);
      return new NextResponse(
        "Failed to get file from storage for embedding - try later. " + err,
        {
          status: 400,
        }
      );
    }
    revalidatePath(`/dashboard/organization/${data.file.tenant_id}`);
    return new NextResponse("Embedding succeeded", { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Failed to parse request. This is a bug " + err, {
      status: 500,
    });
  }
}
