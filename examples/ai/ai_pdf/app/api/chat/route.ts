import { configureNile, nile } from "@/lib/NileServer";
import { OpenAIEmbeddings } from "@langchain/openai";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

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

      let messages: {
        role: "system" | "user" | "assistant";
        content: string;
      }[] = [];
      const systemMessage = {
        role: "system" as const,
        content:
          "You are a friendly assistant who uses the context below to answer questions in markdown format. Answer honestly, citing sources with line numbers. Provide inline citation.",
      };

      let userContent = "";
      if ((prevMessages.rowCount ?? 0) < 6) {
        userContent = `Use the provided context: ${concatenatedPageContent} to answer the user's question: ${question}. Answers should be in markdown format. If unsure, simply say you don't know.
      Helpful Answer:`;
      } else {
        userContent = `Use the provided context: ${concatenatedPageContent} to answer the user's question: ${question}. Answers should be in markdown format. If unsure, simply say you don't know.
      \n----------------\n
      PREVIOUS CONVERSATION:
      ${prevMessages.rows
        .map((msg: any) => `${msg.role}: ${msg.text}`)
        .join("\n")}
      \n----------------\n
      Helpful Answer:`;
      }

      messages = [
        systemMessage,
        { role: "user" as const, content: userContent },
      ];

      const result = streamText({
        model: openai(process.env.OPENAI_CHAT_MODEL_NAME || "gpt-3.5-turbo"),
        messages: messages,
        temperature: 0.1,
        onFinish: async ({ text }) => {
          await nile.query(
            `INSERT INTO message 
            (text, "fileId", user_id, "isUserMessage", tenant_id) 
            VALUES 
            ($1, $2, $3, $4, $5)`,
            [text, body.fileId, body.user_id, false, body.tenant_id]
          );
        },
      });

      return result.toUIMessageStreamResponse();
    } else {
      console.log("There are no matches.");
      // Return a data stream with "No Matches" text.
      // 0:"text" is the format for text parts.
      return new Response('0:"No Matches"\n', {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  } catch (error) {
    console.log("[READ_error]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
