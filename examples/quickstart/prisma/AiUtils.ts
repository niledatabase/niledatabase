import { OpenAI } from "openai";
import { Prisma, PrismaClient } from "@prisma/client";

const DEFAULT_MODEL = "nomic-ai/nomic-embed-text-v1.5";
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || DEFAULT_MODEL;

export enum EmbeddingTasks {
  SEARCH_DOCUMENT = "search_document:",
  SEARCH_QUERY = "search_query:",
}

export interface Todo {
  title: string;
  estimate: string;
}

export function embeddingToSQL(embedding: number[]) {
  return JSON.stringify(embedding);
}

function adjust_input(text: string, task: EmbeddingTasks): string {
  if (EMBEDDING_MODEL?.indexOf("nomic") >= 0) {
    return task + text;
  } else {
    return text;
  }
}

export async function embedTask(title: string, task: EmbeddingTasks) {

  const ai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: process.env.AI_BASE_URL,
  });

  // generate embeddings
  let resp = await ai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: adjust_input(title, task),
  });

  // OpenAI's response is an object with an array of
  // objects that contain the vector embeddings
  // We just return the vector embeddings
  return resp.data[0].embedding;
}

//@ts-ignore
export async function findSimilarTasks(tenantNile: PrismaClient<any, any, any, Types.Extensions.Args>, title: string) {
  const embedding = await embedTask(title, EmbeddingTasks.SEARCH_QUERY);

  // get similar tasks, no need to filter by tenant because we are already in the tenant context
  const similarTasks = await tenantNile.$queryRaw`SELECT title, estimate FROM todos WHERE 
    embedding <-> ${embeddingToSQL(embedding)}::vector < 1 order by embedding <-> ${embeddingToSQL(embedding)}::vector limit 3`;

  console.log(` found ${similarTasks.length} similar tasks`);

  return similarTasks;
}

export async function aiEstimate(title: string, similarTasks: Todo[]) {
  // I use Fireworks as the model vendor for this example, but any OpenAI-compatible vendor will work
  // Just swap the API key, URL and model
  const ai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: process.env.AI_BASE_URL,
  });

  const model =
    process.env.AI_MODEL ||
    "accounts/fireworks/models/llama-v3p1-405b-instruct";

  const aiEstimate = await ai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `you are an amazing project manager. I need to ${title}. How long do you think this will take? 
        I have a few similar tasks with their estimates, please use them as reference: ${JSON.stringify(similarTasks)}.
        respond with just the estimate, no yapping.`,
      },
    ],
    model: model,
  });

  // if we got a valid response, return it
  if (aiEstimate.choices[0].finish_reason === "stop") {
    return aiEstimate.choices[0].message.content;
  }
  // otherwise, we simply don't have an estimate
  return "unknown";
}
