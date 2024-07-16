import { OpenAIEmbeddings } from "@langchain/openai";

// When trying to replace the embedding model, we need to change the import and model name.
// We should also use a different table for new embeddings, since the dimensions might be different and we need to know which model was used.
// Hopefully the APIs are all the same.
export const EMBEDDING_MODEL = "text-embedding-3-large";
export const EMBEDDING_TABLE = "embeddings_openai_text3_large";

export async function createVectorEmbedding(text: string): Promise<number[]> {
  const model = new OpenAIEmbeddings({
    model: EMBEDDING_MODEL,
    dimensions: 1024, // fewer dimensions for more efficient use of PG TOAST storage. OpenAI models were trained to scale down well to fewer dimensions.
  });
  const res = await model.embedDocuments([text]);
  return res[0]; // we sent one text, we get one embedding
}
