import { Server } from "@niledatabase/server";
import { OpenAI } from "openai";


export async function aiEstimate(tenantNile: Server, title: string) {
    // I use Fireworks as the model vendor for this example, but any OpenAI-compatible vendor will work
    // Just swap the API key, URL and model
    const ai = new OpenAI({ 
        apiKey: process.env.AI_API_KEY, 
        baseURL: process.env.AI_BASE_URL, 
    });

    const model = process.env.AI_MODEL;

  const aiEstimate = await ai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `you are an amazing project manager. I need to ${title}. How long do you think this will take? respond with just the estimate, no yapping.`,
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