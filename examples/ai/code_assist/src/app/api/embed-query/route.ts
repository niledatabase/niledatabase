import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { Nile } from '@niledatabase/server';
import { createVectorEmbedding, EMBEDDING_TABLE } from '@/lib/EmbeddingUtils';

const MODEL = "gpt-3.5-turbo-instruct" // until we find a better model, this is a low cost start...

function iteratorToStream(iterator: any, response: string) {
    return new ReadableStream({
     start(controller) {
        controller.enqueue(response)
        controller.enqueue("EOJSON") // this is our separator. Streaming LLM answer comes next
     },
    async pull(controller) {
        const { value, done } = await iterator.next()
   
        if (done) {
          controller.close()
        } else {
            console.log('Value:', value.content)
          controller.enqueue(value.content)
        }
      },
    })
  }

// TODO: Need to set nile user ID from cookie for security
export async function POST(req: Request) {

    // These will be used to send the response in chunks
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    let counter = 0;
    let string = "";

    const body  = await req.json();
    console.log('Received body:', body); 
    if (!body.question && !body.tenant_id && !body.project_id) {
        return new Response('Bad Request', { status: 400 });
    }

    const embedding = await createVectorEmbedding(body.question);
    const formattedEmbedding = JSON.stringify(embedding);

    const nile = await Nile();
    nile.tenantId = body.tenant_id;
    const project_id = body.project_id;

    // TODO: Do we need to add project_id to the embedding table to avoid the join?
    try {
        const query = `
            SELECT file_id
            FROM ${EMBEDDING_TABLE}
            JOIN file_content fc ON fc.id = file_id
            WHERE fc.project_id = $1
            ORDER BY embedding <-> $2
            LIMIT 5
        `;

        const retrievedFileNames = await nile.db.query(query, [project_id, formattedEmbedding]); // no need to specify tenant_id, as we set the context above
        const files = retrievedFileNames.rows.map((row: any) => row.file_id);
        let allContent: string[] = [];
        let fileNames: string[] = [];
        let response = {"files": fileNames, "content": allContent, "answer": ""};

        // now we need to read the actual files into a string and send it to the model
        
        for (const file of files) {
            const raw = await nile.db.query(`SELECT file_name,contents FROM file_content WHERE id = $1`, [file]);
            const content = raw.rows[0].contents;
            const file_name = raw.rows[0].file_name;
            console.log(`file ${file_name} has ${content.length} characters`);
            response.content.push(content);
            response.files.push(file_name);
        }

        // prompt template is hardcoded here, until maybe we get users to play with the prompts
        const model = new ChatOpenAI({
            temperature: 0.9,
            // In Node.js defaults to process.env.OPENAI_API_KEY
          });


       const respStream = await model.stream(
            [
                new SystemMessage(`You are a principal software engineer, answering questions about code projects to other software engineers. 
                    Use the following snippets of retrieved code to answer the question. 
                  They represent code snippets from the files most similar to the question.
                  Include code snippets from the provided context in your answer when relevant.
                  Context: ${allContent.join('\n')}`),
                new HumanMessage(`Please answer this question: ${body.question}. Helpful Answer:`)]);

        /*
        // NOT A GOOD WAY TO STREAM, but lets start
        for await (const chunk of stream) {
            console.log(`${chunk.content}|`);
            chunks.push(chunk);
        }

        let answer = "";
        for (const chunk of chunks) {
            answer += chunk.content;
        }


        response.answer = answer;
                    console.log('Answer:', response.answer)
        return new Response(JSON.stringify(response), { status: 200 });*/

        const stream = iteratorToStream(respStream, JSON.stringify(response))
 
        return new Response(stream)
    } catch (error) {
        console.error('Error querying the database:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
