# Multi-tenant todo list backend service with Nile, Express and Drizzle

This example shows how to use Nile in NodeJS and React for a multi-tenant todo list application.

- [Video guide - TBD]()
- [Step by step guide - TBD]()

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

Install dependencies with `yarn install` or `npm install`.

### 5. Running the app

Start the web service with `npm start` or `yarn start`.

Now you can use `curl` to explore the APIs. Here are a few examples:

```bash
# create a tenant
curl --location --request POST 'localhost:3001/api/tenants' \
--header 'Content-Type: application/json' \
--data-raw '{"name":"my first customer", "id":"108124a5-2e34-418a-9735-b93082e9fbf2"}'

# get tenants
curl  -X GET 'http://localhost:3001/api/tenants'

# create a todo (don't forget to use a read tenant-id in the URL)
curl  -X POST \
  'http://localhost:3001/api/tenants/108124a5-2e34-418a-9735-b93082e9fbf2/todos' \
  --header 'Content-Type: application/json' \
  --data-raw '{"title": "feed the cat", "complete": false}'

# list todos for tenant (don't forget to use a read tenant-id in the URL)
curl  -X GET \
  'http://localhost:3001/api/tenants/108124a5-2e34-418a-9735-b93082e9fbf2/todos'

# list todos for all tenants
curl  -X GET \
  'http://localhost:3001/insecure/all_todos'
```

### Known Issues

#### NodeJS 20.5.0

We recommend running this example on NodeJS 18 (current long term stable release).

When attempting to run this on NodeJS v20, you may see:

```js
[api] TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for /Users/gwen/workspaces/niledatabase/examples/quickstart/node_react/src/be/app.ts
[api]     at new NodeError (node:internal/errors:405:5)
[api]     at Object.getFileProtocolModuleFormat [as file:] (node:internal/modules/esm/get_format:99:9)
[api]     at defaultGetFormat (node:internal/modules/esm/get_format:142:36)
[api]     at defaultLoad (node:internal/modules/esm/load:91:20)
[api]     at nextLoad (node:internal/modules/esm/hooks:733:28)
[api]     at load (/Users/gwen/.nvm/versions/node/v20.5.0/lib/node_modules/ts-node/dist/child/child-loader.js:19:122)
[api]     at nextLoad (node:internal/modules/esm/hooks:733:28)
[api]     at Hooks.load (node:internal/modules/esm/hooks:377:26)
[api]     at MessagePort.handleMessage (node:internal/modules/esm/worker:168:24)
[api]     at [nodejs.internal.kHybridDispatch] (node:internal/event_target:778:20) {
[api]   code: 'ERR_UNKNOWN_FILE_EXTENSION'
```

Due to this open issue in ts-node: https://github.com/TypeStrong/ts-node/issues/1997
