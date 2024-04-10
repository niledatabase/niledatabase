import { configureNile } from "./NileServer";
import { cookies } from "next/headers";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { v4 as uuidv4 } from "uuid";

export async function indexPDF(tenant_id: string, url: string) {
  const message = `Indexing ${url} for tenant ${tenant_id}`;
  console.log(message);

  const tenantNile = configureNile(cookies().get("authData"), tenant_id);
  const chunks: any[] = []; // we'll store 1000 char subsets of the text here
  const file_id = uuidv4();

  try {
    const start_time = performance.now();
    // loading document
    const response = await fetch(`${url}`);
    const blob = await response.blob();
    const loader = new PDFLoader(blob) || new TextLoader(blob);
    const pageLevelDocs = await loader.load();
    const pagesAmt = pageLevelDocs.length;
    console.log(`Found ${pagesAmt} pages in the document`);
    if (pagesAmt === 0) {
      throw new Error(
        "Failed to parse document or no text found. Try something else."
      );
    }

    // splitting text into chunks
    for (const doc of pageLevelDocs) {
      const text = doc.pageContent;
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
      });
      const chunks_in_page = await textSplitter.splitText(text);
      chunks.push(...chunks_in_page);
    }
    console.log(`Total chunks: ${chunks.length}`);
    const modelName =
      process.env.OPENAI_EMBEDDING_MODEL_NAME || "text-embedding-3-small";

    if (chunks.length > 10) {
      chunks.length = 10;
    }

    // store file metadata in Nile
    // We need to do this first, since file_id is a foreign key in file_embedding
    try {
      await tenantNile.db.query(
        `insert into files (id, tenant_id, url, pages, chunks, first_paragraph) 
            values ($1, $2, $3, $4, $5, $6)`,
        [file_id, tenant_id, url, pagesAmt, chunks.length, chunks[0]]
      );
    } catch (error) {
      console.error(`Failed to store file metadata: ${error}`);
      throw error;
    }

    // generating embeddings
    const embeddingsArrays = await new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: modelName,
      dimensions: +(process.env.OPENAI_EMBEDDING_DIMENSIONS || 1024),
    }).embedDocuments(chunks);

    // storing embeddings in Nile
    try {
      embeddingsArrays.forEach(async (vector, index) => {
        await tenantNile.db.query(
          `insert into file_embedding (file_id, tenant_id, embedding_id, embedding, "pageContent") 
                values ($1, $2, $3, $4, $5)`,
          [
            file_id,
            tenant_id,
            index,
            JSON.stringify(vector.values),
            JSON.stringify(chunks[index]),
          ]
        );
      });
    } catch (error) {
      console.error(`Failed to store embeddings: ${error}`);
      throw error;
    }
    const end_time = performance.now();
    console.log(`Indexing took ${end_time - start_time} milliseconds`);

    // update time to index in Nile
    try {
      await tenantNile.db.query(
        `update files set time_to_index = $1 where id = $2`,
        [Math.round(end_time - start_time), file_id]
      );
    } catch (error) {
      console.error(`Failed to update time to index: ${error}`);
      throw error;
    }
  } catch (error) {
    console.error(`Failed to index ${url}: ${error}`);
    throw error;
  }
}
