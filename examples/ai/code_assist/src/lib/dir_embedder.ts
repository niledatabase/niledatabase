// Given a directory with code files, a Nile DB, and a language, this script will extract embeddings for code assist.
// The embeddings are stored in a tenant in Nile database

import * as fs from 'fs';
import * as glob from 'glob';
import expandTilde from 'expand-tilde';
import { v4 as uuidv4 } from 'uuid';
import { Nile, Server } from '@niledatabase/server';
import {EMBEDDING_TABLE, createVectorEmbedding} from './EmbeddingUtils'


const LanguageMappings: Map<string, string[]> = new Map([
    ["python", ["py"]],
    ["javascript", ["js","jsx"]],
    ["typescript", ["ts","tsx"]],
    ["java", ["java"]],
  ]);

// Function to read files and create embeddings
async function processFiles(directory: string, language: string, nile: Server, tenant_id: string) {
    const expDirectory = expandTilde(directory)
    const fileExtensions = LanguageMappings.get(language);
    if (!fileExtensions) {
        throw new Error(`Language ${language} not supported`);
    }
    const fileGlobs = fileExtensions.map(ext => `${expDirectory}/**/*.${ext}`);

    const files = glob.sync([
        `${expDirectory}/**/README.md`].concat(fileGlobs),{ // always include the README
        ignore: [
            `${expDirectory}/venv/**/*.*`,
            `${expDirectory}/**/node_modules/**/*.*`,
            `${expDirectory}/**/dist/**/*.*`,
            `${expDirectory}/**/build/**/*.*`,
            `${expDirectory}/**/target/**/*.*`,
        ]
    });
    console.log(`Found ${files.length} files with extension ${fileExtensions}`);
    const client = await nile.db.connect(); // need to grab a client, so we can insert embeddings in one transaction
    client.query('BEGIN');
    try {
        for (const file of files) {
            const content = fs.readFileSync(file, 'utf-8');
            console.log(`file ${file} has ${content.length} characters`);
            // TODO: Chunk large files?
            // TODO: Batch embeddings?
            const embedding = await createVectorEmbedding(content);
            const formattedEmbedding = JSON.stringify(embedding);
            console.log(`embedding for ${file} has ${embedding.length} dimensions`)
            
            await client.query(`INSERT INTO ${EMBEDDING_TABLE}(tenant_id, file_name, embedding) VALUES($1, $2, $3)`, [tenant_id, file, formattedEmbedding]);
        }
    } catch (error) {
        client.query('ROLLBACK');
        throw error;
    }
    client.query('COMMIT');
}

async function getOrCreateTenantId(nile: Server, tenant_name: string): Promise<string> {
    const tenants = await nile.db.query('select id from tenants where name = $1', [tenant_name]);
    if (tenants.rows.length > 0) {
        console.log(`Using existing tenant: ${tenants.rows[0]}`);
        return tenants.rows[0].id;
    } else {
        const tenant_id = uuidv4();
        console.log(`Creating new tenant with ${tenant_name} and ${tenant_id}`);
        await nile.db.query('INSERT INTO tenants(id, name) VALUES($1, $2)', [tenant_id, tenant_name]);
        return tenant_id;
    }
}

// Main function
async function embedDirectory(directory: string, language: string) {

    try {
        const nile = await Nile();
        const tenant_name = directory.split('/').pop();
        const tenant_id = await getOrCreateTenantId(nile, tenant_name!);
        nile.tenantId = tenant_id;

        await processFiles(directory, language, nile, tenant_id);
        console.log('File embeddings stored successfully for directory:', directory);
    } catch (error) {
        console.error('Error processing files:', error);
    }
}

// Run the main function
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/nextjs', 'typescript')
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/python', 'python')
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/django', 'python')
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/drizzle', 'typescript')
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/node_react', 'javascript')
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/node_react', 'typescript')
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/java', 'java')
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/prisma', 'typescript')