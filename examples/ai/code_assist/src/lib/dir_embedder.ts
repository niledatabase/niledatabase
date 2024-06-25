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
async function processFiles(directory: string, language: string, project_id: string, nile: Server, tenant_id: string) {
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
            if (content.length > 0) {
                const result = await nile.db.query('INSERT INTO file_content(tenant_id, project_id, file_name, contents) VALUES($1, $2, $3, $4) RETURNING id', [tenant_id, project_id, file, content]);
                const file_id = result.rows[0].id;
                // TODO: Chunk large files?
                // TODO: Batch embeddings?
                const embedding = await createVectorEmbedding(content);
                const formattedEmbedding = JSON.stringify(embedding);
                console.log(`embedding for ${file} has ${embedding.length} dimensions`)
            
                await client.query(`INSERT INTO ${EMBEDDING_TABLE}(tenant_id, file_id, embedding) VALUES($1, $2, $3)`, [tenant_id, file_id, formattedEmbedding]);
            }
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

async function getOrCreateProject(nile: Server, project_name: string, project_url: string, tenant_id: string): Promise<string> {
    const projects = await nile.db.query('select id from projects where name = $1', [project_name]);
    if (projects.rows.length > 0) {
        console.log(`Using existing project: ${projects.rows[0]}`);
        return projects.rows[0].id;
    } else {
        const project_id = uuidv4();
        console.log(`Creating new project with ${project_name} and ${project_id}`);
        await nile.db.query('INSERT INTO projects(id, name, url, tenant_id) VALUES($1, $2, $3, $4)', [project_id, project_name, project_url, tenant_id]);
        return project_id;
    }
}

async function embedDirectory(directory: string, language: string, tenant_name: string, project_name: string, project_url: string) {

    try {
        const nile = await Nile();
        const tenant_id = await getOrCreateTenantId(nile, tenant_name!);
        nile.tenantId = tenant_id;

        const project_id = await getOrCreateProject(nile, project_name, project_url, tenant_id);

        await processFiles(directory, language, project_id, nile, tenant_id);
        console.log('File embeddings stored successfully for directory:', directory);
    } catch (error) {
        console.error('Error processing files:', error);
    }
}

// Embed niledatabase projects
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/nextjs', 'typescript', 'niledatabase', 'NextJS quickstart', 'https://github.com/niledatabase/niledatabase/tree/main/examples/quickstart/nextjs')
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/python', 'python','niledatabase', 'Python quickstart','https://github.com/niledatabase/niledatabase/tree/main/examples/quickstart/python')
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/django', 'python','niledatabase', 'Django quickstart','https://github.com/niledatabase/niledatabase/tree/main/examples/quickstart/django')
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/drizzle', 'typescript','niledatabase', 'Drizzle quickstart','https://github.com/niledatabase/niledatabase/tree/main/examples/quickstart/drizzle')
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/node_react', 'javascript','niledatabase', 'Node-React quickstart','https://github.com/niledatabase/niledatabase/tree/main/examples/quickstart/node_react')
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/node_react', 'typescript','niledatabase', 'Node-React quickstart','https://github.com/niledatabase/niledatabase/tree/main/examples/quickstart/node_react')
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/java', 'java','niledatabase', 'Java quickstart','https://github.com/niledatabase/niledatabase/tree/main/examples/quickstart/java')
await embedDirectory('~/workspaces/niledatabase/examples/quickstart/prisma', 'typescript','niledatabase', 'Prisma quickstart','https://github.com/niledatabase/niledatabase/tree/main/examples/quickstart/prisma')

// Embed Vercel projects

// Embed PGVector projects

// Embed Replit Kaboom

// Embed Langchain projects

// Embed LlamaIndex projects