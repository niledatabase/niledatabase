This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, sign in to Nile console, and if you haven't yet, create a workspace and a database. 

Create the following table for storing our embeddings:

```sql
            CREATE TABLE IF NOT EXISTS embeddings_openai_text3_large (
                tenant_id UUID ,
                id UUID DEFAULT gen_random_uuid (),
                file_id UUID,
                embedding  vector(1024) NOT NULL, 
                primary key (tenant_id, id)
            );
```

We also need somewhere to store the code itself. It doesn't have to be Postgres - S3 or Github are fine. 
But Postgres is convenient in our example.

```sql
            CREATE TABLE IF NOT EXISTS file_content (
                tenant_id UUID ,
                id UUID DEFAULT gen_random_uuid (),
                file_name VARCHAR(255) NOT NULL, 
                contents  TEXT NOT NULL, 
                primary key (tenant_id, id)
            );
```
