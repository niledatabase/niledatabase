// pages/api/generateEmbedding.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Nile } from '@niledatabase/server';
import { createVectorEmbedding, EMBEDDING_TABLE } from '@/lib/EmbeddingUtils';

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
            SELECT file_name
            FROM ${EMBEDDING_TABLE}
            ORDER BY embedding <-> $1
            LIMIT 5
        `;
        
        const result = await nile.db.query(query, [formattedEmbedding]); // no need to specify tenant_id, as we set the context above

        return new Response(JSON.stringify(result.rows.map(row => row.file_name)), { status: 200 });
    } catch (error) {
        console.error('Error querying the database:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
