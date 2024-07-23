import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { Nile } from "@niledatabase/server";
import { createVectorEmbedding, EMBEDDING_TABLE } from "@/lib/EmbeddingUtils";

const MODEL = "gpt-4o-mini"; // until we find a better model, this is a low cost start...

function iteratorToStream(iterator: any, response: string) {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(response);
      controller.enqueue("EOJSON"); // this is our separator. Streaming LLM answer comes next
    },
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value.content);
      }
    },
  });
}

// TODO: Need to set nile user ID from cookie for security
export async function POST(req: Request) {
  // These will be used to send the response in chunks
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  let counter = 0;
  let string = "";

  const body = await req.json();
  console.log("Received body:", body);
  if (!body.question && !body.tenant_id && !body.project_id) {
    return new Response("Bad Request", { status: 400 });
  }

  const embedding = await createVectorEmbedding(body.question);
  const formattedEmbedding = JSON.stringify(embedding);

  const nile = await Nile();
  nile.tenantId = body.tenant_id;
  const project_id = body.project_id;

  /* Using inner product to find the most similar files. Based on suggestions from the OpenAI FAQ:
    We recommend cosine similarity. The choice of distance function typically doesn’t matter much.
    OpenAI embeddings are normalized to length 1, which means that:
    Cosine similarity can be computed slightly faster using just a dot product
    Cosine similarity and Euclidean distance will result in the identical rankings

    Note that even though we find the 5 nearest embeddings based on inner product, we print all 3 distances for each file for verification purpose.
    Cosine distance - values between 0 and 2, where 0 is the most similar. 
    Negative inner product - values between -1 and 1, where -1 is the most similar.
    Euclidean distance - values between 0 and infinity, where 0 is the most similar.
    */
  try {
    const query = `
            SELECT file_id, file_name, contents, 
            embedding <=> $2 as cosine_distance, embedding <-> $2 as euclidean_distance, (embedding <#> $2)* -1 as inner_product
            FROM ${EMBEDDING_TABLE}
            JOIN file_content fc ON fc.id = file_id
            WHERE fc.project_id = $1
            ORDER BY (embedding <#> $2)
            LIMIT 5
        `;

    const retrievedFiles = await nile.db.query(query, [
      project_id,
      formattedEmbedding,
    ]); // no need to specify tenant_id, as we set the context above
    let allContent: string[] = [];
    let fileNames: string[] = [];
    let response = { files: fileNames, content: allContent, answer: "" };

    // now we need to read the actual files into a string and send it to the model

    for (const file of retrievedFiles.rows) {
      const content = file.contents;
      const file_name = file.file_name;
      console.log(`file ${file_name} has ${content.length} characters.`);
      console.log(
        "cosine distance:",
        file.cosine_distance,
        "euclidean distance:",
        file.euclidean_distance,
        "inner product:",
        file.inner_product
      );
      response.content.push(content);
      response.files.push(file_name);
    }

    // prompt template is hardcoded here, until maybe we get users to play with the prompts
    const model = new ChatOpenAI({
      temperature: 0.9,
      // In Node.js defaults to process.env.OPENAI_API_KEY
    });

    const respStream = await model.stream([
      new SystemMessage(`You are a principal software engineer, answering questions about code projects to other software engineers. 
                    Use the following snippets of retrieved code to answer the question. 
                  They represent code snippets from the files most similar to the question.
                  Include code snippets from the provided context in your answer when relevant.
                  Context: ${allContent.join("\n")}`),
      new HumanMessage(
        `Please answer this question: ${body.question}. Helpful Answer:`
      ),
    ]);

    const stream = iteratorToStream(respStream, JSON.stringify(response));

    return new Response(stream);
  } catch (error) {
    console.error("Error querying the database:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
