This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, sign in to Nile console, and if you haven't yet, create a workspace and a database. 

Create the following tables for storing our embeddings:

```sql
            CREATE TABLE IF NOT EXISTS embeddings_gte_large (
                tenant_id UUID ,
                id UUID DEFAULT gen_random_uuid (),
                file_name VARCHAR(255) NOT NULL, -- move to another table when we decide to chunk files
                embedding  vector(1024) NOT NULL, -- gte large v1.5 has 1024 dim vector, it will be different for other models
                primary key (tenant_id, id)
            )
```
