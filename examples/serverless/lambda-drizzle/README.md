# Serverless multi-tenant todo list backend with AWS Lambda, Serverless Framework, NodeJS, Drizzle and Nile

This template shows how to use Nile in an AWS Lambda app. It uses the Serverless Framework for deployment, NodeJS runtime and Drizzle ORM.

- [Video guide](https://youtu.be/tikEF_zCw8g)
- [Live demo](https://todo-lambda.vercel.app/)
- [Step by step guide](https://www.thenile.dev/docs/serverless/lambda)

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
    "complete" boolean,
    CONSTRAINT todos_tenant_id_id PRIMARY KEY("tenant_id","id")
  );
```

If all went well, you'll see the new table in the panel on the left hand side of the query editor. You can also see Nile's built-in tenant table next to it.

### 3. Getting credentials

In the left-hand menu, click on "Settings" and then select "Connection".

Click on the Postgres button, then click "Generate Credentials" on the top right corner. Copy the connection string - it should now contain the credentials we just generated.

### 4. Setting the environment

If you haven't cloned this repository yet, now will be an excellent time to do so.

```bash
git clone https://github.com/niledatabase/niledatabase
cd niledatabase/examples/quickstart/drizzle
```

Rename `.env.example` to `.env`, and update it with the connection string you just copied from Nile Console. Make sure you don't include the word "psql". It should look something like this:

```bash
DATABASE_URL=postgres://018b778a-30df-7cdd-b55c-2f9664db39f3:ff3fb983-683c-4616-bbbc-519d8ddbbce5@db.thenile.dev:5432/gwen_db
```

**Optional:** You can select a region for deploying this example by editing `serverless.yml`

Install dependencies with `npm install`.

### 5. Deployment

In order to deploy the example, you need to run the following command:

```bash
serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying serverless-node-drizzle to stage dev (us-east-2)

✔ Service deployed to stack serverless-node-drizzle-dev (93s)

endpoint: ANY - https://z2fmc4ux34.execute-api.us-west-2.amazonaws.com
functions:
  api: serverless-node-drizzle-dev-api (424 kB)
```

### 6. Try it out

Now you can take the URL above and use `curl` to explore the APIs. Here are a few examples:

```bash
# create a tenant
curl --location --request POST 'https://z2fmc4ux34.execute-api.us-west-2.amazonaws.com/api/tenants' \
--user 'test-user:' \
--header 'Content-Type: application/json' \
--data-raw '{"name":"my first customer"}'

# get tenants
curl  -X GET 'https://z2fmc4ux34.execute-api.us-west-2.amazonaws.com/api/tenants' --user '018bcbc9-ed15-721e-a1c2-772751dcd240:'

# create a todo (don't forget to use a read tenant-id in the URL)
curl  -X POST \
  'https://z2fmc4ux34.execute-api.us-west-2.amazonaws.com/api/tenants/108124a5-2e34-418a-9735-b93082e9fbf2/todos' \
  --user 'test-user:' \
  --header 'Content-Type: application/json' \
  --data-raw '{"title": "feed the cat", "complete": false}'

# list todos for tenant (don't forget to use a read tenant-id in the URL)
curl  -X GET \
  --user 'test-user:' \
  'https://z2fmc4ux34.execute-api.us-west-2.amazonaws.com/api/tenants/108124a5-2e34-418a-9735-b93082e9fbf2/todos'

# list todos for all tenants
curl  -X GET \
  --user 'test-user:' \
  'https://z2fmc4ux34.execute-api.us-west-2.amazonaws.com/insecure/all_todos'
```
