// import { db } from "@/lib/db";
// import { getPineconeClient } from "@/lib/pinecone";
import nile from "@/lib/NileServer";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { NextRequest, NextResponse } from "next/server";

// export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data, "DATA");
    console.log("1: Index api");
    try {
      const response = await fetch(`${data.file.url}`);
      console.log("2: Index api");
      console.log(response);
      const blob = await response.blob();
      console.log(blob, "BLOB");
      const loader = new PDFLoader(blob);
      console.log(loader, "LOADER");
      const pageLevelDocs = await loader.load();
      console.log(pageLevelDocs);
      const pagesAmt = pageLevelDocs.length;
      console.log(pagesAmt);
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
          console.log("EMBED CALL HERE");
          const modelName = process.env.OPENAI_EMBEDDING_MODEL_NAME || "text-embedding-3-small";
          const embeddingsArrays = await new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: modelName,
            dimensions: +(process.env.OPENAI_EMBEDDING_DIMENSIONS || 1024),
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
            console.log(vector);

            batch = [...batch, vector];
            if (batch.length === batchSize || idx === chunks.length - 1) {
              console.log(batch);
              console.log(batch[0].values);

              for (const vector of batch) {
                const uuid = vector.id.split("_")[0];
                await nile.db("file_embedding").insert({
                  file_id: data.file.id,
                  tenant_id: data.file.tenant_id,
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
              id: data.file.id,
              tenant_id: data.file.tenant_id,
            })
            .update({ isIndex: true });
        }
      } catch (err) {
        console.log("error: Error in upserting to database ", err);
        return new NextResponse("Error in upserting to database", {
          status: 400,
        });
      }
    } catch (error) {
      console.log(error);
      return new NextResponse("Could not fetch", {
        status: 400,
      });
    }

    return new NextResponse("FROM INDEX API", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("No Matches", { status: 400 });
  }
}
