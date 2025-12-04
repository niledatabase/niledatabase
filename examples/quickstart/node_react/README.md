# Multi-tenant AI-native todo list app with Nile, NodeJS and React

This template shows how to use Nile in NodeJS and React for an AI-native multi-tenant todo list application.

- [Live demo](https://demo-todo-node.fly.dev)
- [Video guide](https://youtu.be/6Lm3-YeLzks)
- [Step by step guide](https://thenile.dev/docs/getting-started/languages/node)

## Getting Started

### 1. Create a new database

Sign up for an invite to [Nile](https://thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

### 2. Create todo table

After you created a database, you will land in Nile's query editor. Since our application requires a table for storing all the "todos" this is a good time to create one:

```sql
    create table todos (id uuid, tenant_id uuid, title varchar(256), estimate varchar(256), embedding vector(768), complete boolean);
```

If all went well, you'll see the new table in the panel on the left hand side of the query editor. You can also see Nile's built-in tenant table next to it.

### 3. Getting credentials

In the left-hand menu, click on "Settings" and then select "Credentials". Generate credentials and keep them somewhere safe. These give you access to the database.
If you want to use Google SSO, you'll want to also go to "General" settings screen and pick up the API URL.

### 4. 3rd party credentials

This example uses AI chat and embedding models to generate automated time estimates for each task in the todo list. In order to use this functionality, you will need access to models from a vendor with OpenAI compatible APIs. Make sure you have an API key, API base URL and the [names of the models you'll want to use](https://www.thenile.dev/docs/ai-embeddings/embedding_models).

### 5. Setting the environment

If you haven't cloned this repository yet, now will be an excellent time to do so.

```bash
git clone https://github.com/niledatabase/niledatabase
cd niledatabase/examples/quickstart/node_react
```

Copy `.env.example` to `.env` and fill in the details of your Nile DB and your AI model vendor.

It should look something like this:

```bash
# This is the env vars for Node.js app. The DB credentials are very secret, so make sure you keep this file safe
NILE_DB_USER = "018b4937-2bbf-70fd-9075-37154198fa1e"
NILE_DB_PASSWORD = "358844ef-cb09-4758-ae77-bec13b801101"

# These end up in the user's browser, so nothing secret should ever start with REACT_APP_...
REACT_PUBLIC_NILEDB_API_URL =

AI_API_KEY=your_api_key_for_openai_compatible_service
AI_BASE_URL=https://api.fireworks.ai/inference/v1
AI_MODEL=accounts/fireworks/models/llama-v3p1-405b-instruct
EMBEDDING_MODEL=nomic-ai/nomic-embed-text-v1.5
```

Install dependencies with `pnpm install`.

### 5. Running the app

You can start both NodeJS api server and the React frontend with `pnpm run start`.

If all went well, your browser should show you the first page in the app, asking you to create a tenant. Feel free to create a tenant or 5.

If you click on "Explore" next to one of the tenants, you can start creating todo items for this tenant - and see the automatic estimate that Llama generates.

If you want to see all the data you created, you can go back to Nile Console and run a few queries:

```sql
select name, title, estimate, complete from
tenants join todos on tenants.id=todos.tenant_id

select * from users;
```

## More things you can do

### Running the app with Docker

You can build a docker container that runs this app, and exposes the webapp on port 3006 (the NodeJS and REST API are not exposed). To build and run the container:

```bash
docker build . -t todo-node-react
docker run -it -p3006:3006 todo-node-react
```

If you point your browser to [http://localhost:3006](http://localhost:3006), you'll see the first page of the app.

### Deploying on Fly

Assuming you already installed `fly` CLI and got the signup/login all set up.
Also, as you can see, this is just an example for "try it out" purposes. It isn't especially secure or highly available with these configs...

```bash
fly launch --vm-memory 512
fly deploy --ha=false --vm-memory 512
```
