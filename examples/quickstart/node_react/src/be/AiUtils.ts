import { OpenAI } from "openai";
import { Server } from "@niledatabase/server";

export enum EmbeddingTasks {
  SEARCH_DOCUMENT = "search_document:",
  SEARCH_QUERY = "search_query:",
}

export interface todo {
  title: string;
  estimate: string;
}

const DEFAULT_MODEL = "nomic-ai/nomic-embed-text-v1.5";
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || DEFAULT_MODEL;

function adjust_input(text: string, task: EmbeddingTasks): string {
  if (EMBEDDING_MODEL?.indexOf("nomic") >= 0) {
    return task + text;
  } else {
    return text;
  }
}

export function embeddingToSQL(embedding: number[]) {
  return JSON.stringify(embedding);
}

export async function embedTask(title: string, task: EmbeddingTasks) {
  console.log(`Embedding task: ${title} ${task}`);
  const ai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: process.env.AI_BASE_URL,
  });

  // generate embeddings
  let resp = await ai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: title,
    dimensions: 768,
  });

  // OpenAI's response is an object with an array of
  // objects that contain the vector embeddings
  // We just return the vector embeddings
  const embedding = resp.data[0].embedding;
  console.log(`Embedding dimensions: ${embedding.length}`);
  return embedding;
}

export async function findSimilarTasks(
  tenantNile: Server,
  title: string
): Promise<todo[]> {
  const embedding = await embedTask(title, EmbeddingTasks.SEARCH_QUERY);

  // get similar tasks, no need to filter by tenant because we are already in the tenant context
  const similarTasks = await tenantNile.db.query(
    `SELECT title, estimate FROM todos WHERE embedding <-> $1 < 1 ORDER BY embedding <-> $1 LIMIT 3;`,
    [embeddingToSQL(embedding)]
  );

  console.log(` found ${similarTasks.rowCount} similar tasks`);

  return similarTasks.rows;
}

export async function aiEstimate(title: string, similarTasks: todo[]) {
  // I use Fireworks as the model vendor for this example, but any OpenAI-compatible vendor will work
  // Just swap the API key, URL and model
  const ai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: process.env.AI_BASE_URL,
  });

  const model =
    process.env.AI_MODEL ||
    "accounts/fireworks/models/llama-v3p1-405b-instruct";

  const message = `you are an amazing project manager. I need to ${title}. How long do you think this will take?${
    similarTasks.length > 0
      ? ` I have a few similar tasks with their estimates in json format, please use them as reference: ${JSON.stringify(similarTasks.map(task => ({
          title: task.title,
          estimate: task.estimate
        })), null, 2)}.`
      : ''
  }
  respond with just the estimate, keep the answer short.`;

  console.log("Message to AI:", message);

  const aiEstimate = await ai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    max_tokens: 64, // limit the response to 64 tokens
    model: model,
  });

  console.log("aiEstimate", aiEstimate);

  // if we got a valid response, return it
  if (aiEstimate.choices[0].finish_reason === "stop") {
    return aiEstimate.choices[0].message.content;
  }
  // otherwise, we simply don't have an estimate
  return "unknown";
}
