import { Server } from "@niledatabase/server";
import { OpenAI } from "openai";

export function embeddingToSQL(embedding: number[]) {
    console.log(embedding);
    return JSON.stringify(embedding);
}

export async function embedTask(title: string) {
    const embedding_model = process.env.EMBEDDING_MODEL || "nomic-ai/nomic-embed-text-v1.5";

    const ai = new OpenAI({ 
        apiKey: process.env.AI_API_KEY, 
        baseURL: process.env.AI_BASE_URL, 
    });

    // generate embeddings
    let resp = await ai.embeddings.create({
        model: embedding_model,
        input: title,
    });
  
  // OpenAI's response is an object with an array of
  // objects that contain the vector embeddings
  // We just return the vector embeddings
  return resp.data[0].embedding;
}

export async function findSimilarTasks(tenantNile: Server, title: string) {

    const embedding = await embedTask(title);

    // get similar tasks, no need to filter by tenant because we are already in the tenant context
    const similarTasks = await tenantNile.db.query(
        `SELECT title, estimate FROM todos WHERE embedding <-> $2 < 1`,
        [tenantNile.tenantId, embeddingToSQL(embedding)]
    );

    console.log(` found ${similarTasks.rowCount} similar tasks`);
    console.log(similarTasks.rows);

    return similarTasks.rows;
}


export async function aiEstimate(tenantNile: Server, title: string) {
    // I use Fireworks as the model vendor for this example, but any OpenAI-compatible vendor will work
    // Just swap the API key, URL and model
    const ai = new OpenAI({ 
        apiKey: process.env.AI_API_KEY, 
        baseURL: process.env.AI_BASE_URL, 
    });

    const model = process.env.AI_MODEL || "accounts/fireworks/models/llama-v3p1-405b-instruct";

    // use embeddings to get some similar tasks, for reference
    const similarTasks = await findSimilarTasks(tenantNile, title);


  const aiEstimate = await ai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `you are an amazing project manager. I need to ${title}. How long do you think this will take? 
        I have a few similar tasks with their estimates, please use them as reference: ${similarTasks}.
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