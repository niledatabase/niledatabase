// using embeddings from Hugging Face Transformers for now, eventualy we should try other options
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";


// When trying to replace the embedding model, we need to change the import and model name. 
// We should also use a different table for new embeddings, since the dimensions might be different and we need to know which model was used.
// Hopefully the APIs are all the same.
export const EMBEDDING_MODEL = "Alibaba-NLP/gte-large-en-v1.5"
export const EMBEDDING_TABLE = "embeddings_gte_large"



export async function createVectorEmbedding(text: string): Promise<number[]> {
  const model = new HuggingFaceTransformersEmbeddings({
      model: EMBEDDING_MODEL,
  });
  const res = await model.embedDocuments([text]);
  return res[0]; // we sent one text, we get one embedding
}