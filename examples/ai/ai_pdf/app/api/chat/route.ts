import { configureNile, nile } from "@/lib/NileServer";
import { OpenAIEmbeddings } from "@langchain/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Chat request body:", body);

    const { nile: tenantNile } = await configureNile(body.tenant_id);

    const question = body.messages[body.messages.length - 1].content;

    console.log("Chat question:", question);
    await nile.query(
      `INSERT INTO message 
      (text, "fileId", user_id, "isUserMessage", tenant_id) 
      VALUES 
      ($1, $2, $3, $4, $5)`,
      [question, body.fileId, body.user_id, true, body.tenant_id]
    );

    const openAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const modelName =
      process.env.OPENAI_EMBEDDING_MODEL_NAME || "text-embedding-3-small";
    const queryEmbedding = await new OpenAIEmbeddings({
      modelName: modelName,
      dimensions: +(process.env.OPENAI_EMBEDDING_DIMENSIONS || 1024),
    }).embedQuery(question);

    console.log("Query Nile index and return top 10 matches");

    const queryResponse = await nile.query(
      `SELECT "pageContent", location 
       FROM file_embedding 
       WHERE file_id = $1 
       ORDER BY embedding <=> '[${queryEmbedding}]'
       LIMIT 10`,
      [body.fileId]
    );

    if (queryResponse) {
      const concatenatedPageContent = queryResponse.rows
        .map((match: any) => match.pageContent)
        .join(" ");
      console.log("Got matches from vector index on Nile");

      const prevMessages = await nile.query(
        `select * from message where "fileId" = $1 AND user_id = $2 limit 6`,
        [body.fileId, body.user_id]
      );

      const formattedPrevMessages = prevMessages.rows.map((msg: any) => ({
        role: msg.isUserMessage ? ("user" as const) : ("assistant" as const),
        content: msg.text,
      }));

      console.log(
        `Got ${prevMessages.rowCount} previous messages from chat history in Nile.`
      );

      let result;
      if ((prevMessages.rowCount ?? 0) < 6) {
        result = await openAI.chat.completions.create({
          model: process.env.OPENAI_CHAT_MODEL_NAME || "gpt-3.5-turbo",
          temperature: 0.1,
          stream: true,
          messages: [
            {
              role: "system",
              content:
                "You are a friendly assistant who uses the context below to answer questions in markdown format. Answer honestly, citing sources with line numbers. Provide inline citation.",
            },
            {
              role: "user",
              content: `Use the provided context: ${concatenatedPageContent} to answer the user's question: ${question}. Answers should be in markdown format. If unsure, simply say you don't know.
      Helpful Answer:`,
            },
          ],
        });
      } else {
        result = await openAI.chat.completions.create({
          model: process.env.OPENAI_CHAT_MODEL_NAME || "gpt-3.5-turbo",
          temperature: 0.1,
          stream: true,
          messages: [
            {
              role: "system",
              content:
                "You are a friendly assistant who uses the context below to answer questions in markdown format. Answer honestly, citing sources with line numbers. Provide inline citation.",
            },
            {
              role: "user",
              content: `Use the provided context: ${concatenatedPageContent} to answer the user's question: ${question}. Answers should be in markdown format. If unsure, simply say you don't know.
      \n----------------\n
      PREVIOUS CONVERSATION:
      ${prevMessages.rows
        .map((msg: any) => `${msg.role}: ${msg.text}`)
        .join("\n")}
      \n----------------\n
      Helpful Answer:`,
            },
          ],
        });
      }

      console.log("Chat result:", result);

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of result) {
              const text = chunk.choices[0]?.delta?.content || "";
              if (text) {
                controller.enqueue(encoder.encode(text));
              }
            }
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      });

      // **Insert the completion result into the database**
      (async () => {
        let completionText = "";
        for await (const chunk of result) {
          completionText += chunk.choices[0]?.delta?.content || "";
        }
        await nile.query(
          `INSERT INTO message 
      (text, "fileId", user_id, "isUserMessage", tenant_id) 
      VALUES 
      ($1, $2, $3, $4, $5)`,
          [completionText, body.fileId, body.user_id, false, body.tenant_id]
        );
      })();

      return new Response(stream, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    } else {
      console.log("There are no matches.");
      return new NextResponse("No Matches", { status: 200 });
    }
  } catch (error) {
    console.log("[READ_error]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
