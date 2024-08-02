# AI-native multi-tenant todo list backend service with Nile and Prisma

This example shows how to use Nile with Prisma for an AI-native multi-tenant todo list application.

- [Live demo](https://todo-prisma-ten.vercel.app)
- [Video guide](https://youtu.be/qsQSQoMpluk?feature=shared)
- [Step by step guide](https://www.thenile.dev/docs/getting-started/languages/prisma)

## Getting Started

### 1. Create a new database

Sign up for an invite to [Nile](https://thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

### 2. Create todo table

After you created a database, you will land in Nile's query editor. Since our application requires a table for storing all the "todos" this is a good time to create one:

```sql
  CREATE TABLE IF NOT EXISTS "todos" (
    "id" uuid DEFAULT gen_random_uuid(),
    "tenant_id" uuid,
    "title" varchar(256),
    "estimate" varchar(256),
    "embedding" vector(768),
    "complete" boolean,
    PRIMARY KEY(tenant_id,id)
  );
```

If all went well, you'll see the new table in the panel on the left hand side of the query editor. You can also see Nile's built-in tenant table next to it.

### 3. Getting credentials

In the left-hand menu, click on "Settings" and then select "Connection".

Click on the Postgres button, then click "Generate Credentials" on the top right corner. Copy the connection string - it should now contain the credentials we just generated.

### 4. 3rd party credentials

This example uses AI chat and embedding models to generate automated time estimates for each task in the todo list. In order to use this functionality, you will need access to models from a vendor with OpenAI compatible APIs. Make sure you have an API key, API base URL and the [names of the models you'll want to use](https://www.thenile.dev/docs/ai-embeddings/embedding_models).

### 5. Setting the environment

If you haven't cloned this repository yet, now will be an excellent time to do so.

```bash
git clone https://github.com/niledatabase/niledatabase
cd niledatabase/examples/quickstart/prisma
```

Rename `.env.example` to `.env`, and update it with the connection string you just copied from Nile Console. Make sure you don't include the word "psql". It should look something like this:

```bash
DATABASE_URL=postgres://018b778a-30df-7cdd-b55c-2f9664db39f3:ff3fb983-683c-4616-bbbc-519d8ddbbce5@db.thenile.dev:5432/gwen_db
```

Then add the configuration for your AI vendor and model. Something like this:

```bash
AI_API_KEY=your_api_key_for_openai_compatible_api
AI_BASE_URL=https://api.fireworks.ai/inference/v1
AI_MODEL=accounts/fireworks/models/llama-v3p1-405b-instruct
EMBEDDING_MODEL=nomic-ai/nomic-embed-text-v1.5
```

Install dependencies with `yarn install` or `npm install`.

### 6. Running the app

Start the web service with `npm start` or `yarn start`.

Now you can use `curl` to explore the APIs. Here are a few examples:

```bash
# create a tenant
curl --location --request POST 'localhost:3001/api/tenants' \
--header 'Content-Type: application/json' \
--data-raw '{"name":"my first customer", "id":"108124a5-2e34-418a-9735-b93082e9fbf2"}'

# get tenants
curl  -X GET 'http://localhost:3001/api/tenants'

# create a todo (don't forget to use a real tenant-id in the URL)
curl  -X POST \
  'http://localhost:3001/api/tenants/108124a5-2e34-418a-9735-b93082e9fbf2/todos' \
  --header 'Content-Type: application/json' \
  --data-raw '{"title": "feed the cat", "complete": false}'

# list todos for tenant (don't forget to use a real tenant-id in the URL)
curl  -X GET \
  'http://localhost:3001/api/tenants/108124a5-2e34-418a-9735-b93082e9fbf2/todos'

# list todos for all tenants
curl  -X GET \
  'http://localhost:3001/insecure/all_todos'
```

### 7. Browse data

If you want to see all the data you created, you can go back to Nile Console and run a few queries:

```sql
select name, title, estimate, complete from
tenants join todos on tenants.id=todos.tenant_id

select * from users;
```

### Notes

- Prisma configuration, schema and client were created with:

  ```bash
  npx prisma init
  npx prisma db pull

  npx prisma generate
  ```

  If starting from scratch, you need to run these _after_ you created the tables in Nile.
  Note that you'll need to manually add the vector column to `schema.prisma` as follows:

```typescript
model todos {
  id        String   @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  tenant_id String   @db.Uuid
  title     String?  @db.VarChar(256)
  estimate  String?  @db.VarChar(256)
  // Prisma doesn't support vector types yet: https://github.com/prisma/prisma/issues/18442
  embedding Unsupported("vector(768)")?
  complete  Boolean?

  @@id([tenant_id, id], map: "todos_tenant_id_id")
  @@schema("public")
}
```

### Running with Docker

```bash
 docker build . -t todo-node-prisma
 docker run -it -p3001:3001 todo-node-prisma
```

### Deploying with Fly

This assumes you have Fly account and credentials all set up:

First, create a secret with your DB connection string, right from your `.env` file:

```bash
fly secrets set DATABASE_URL=postgresql://user:password@db.thenile.dev:5432/mydb
fly secrets set AI_API_KEY=...
```

Then copy over the launch example: `cp fly.example fly.toml` and make any edits you may need.
For example, remove `REQUIRE_AUTH` environment variable if you are not planning to use authentication.

Now we only need to deploy, since this is an example, we don't need high availability:

```bash
fly deploy --ha=false
```

Note: if you use `fly launch` make sure not to provision a database, since you already have one in Nile!
