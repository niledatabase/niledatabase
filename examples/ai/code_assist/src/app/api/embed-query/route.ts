import { OpenAI } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { Nile } from '@niledatabase/server';
import { createVectorEmbedding, EMBEDDING_TABLE } from '@/lib/EmbeddingUtils';

const MODEL = "gpt-3.5-turbo-instruct" // until we find a better model, this is a low cost start...

export async function POST(req: Request) {
    const body  = await req.json();
    console.log('Received body:', body); 
    if (!body.question && !body.tenant_id) {
        return new Response('Bad Request', { status: 400 });
    }

    const embedding = await createVectorEmbedding(body.question);
    const formattedEmbedding = JSON.stringify(embedding);

    const nile = await Nile();
    nile.tenantId = body.tenant_id;

    try {
        const query = `
            SELECT file_id
            FROM ${EMBEDDING_TABLE}
            ORDER BY embedding <-> $1
            LIMIT 5
        `;

        const retrievedFileNames = await nile.db.query(query, [formattedEmbedding]); // no need to specify tenant_id, as we set the context above
        const files = retrievedFileNames.rows.map(row => row.file_id);
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

        // TOOD: figure out how to use streaming with NextJS...
        // prompt template is hardcoded here, until maybe we get users to play with the prompts
        const model = new ChatOpenAI({
            temperature: 0.9,
            // In Node.js defaults to process.env.OPENAI_API_KEY
          });


       const answer = await model.invoke(
            [
                new SystemMessage(`You are a principal software engineer, answering questions about code projects to other software engineers. 
                    Use the following snippets of retrieved code to answer the question. 
                  They represent code snippets from the files most similar to the question.
                  Keep the answer concise, no yapping. Include code snippets from the provided context in your answer when relevant.
                  Context: ${allContent.join('\n')}`),
                new HumanMessage(`Please answer this question: ${body.question}. Helpful Answer:`)]);

        response.answer = answer.content.toString();
                    console.log('Answer:', response.answer)
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error('Error querying the database:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
