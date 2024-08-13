# Multi-tenant AI-native todo list app with Nile and NextJS 13

This template shows how to use Nile with NextJS 13 for a multi-tenant AI-native todo list application.

- [Live demo](https://nextjs-quickstart-omega.vercel.app)
- [Video guide](https://www.youtube.com/watch?v=Eo0dDROnJGg)
- [Step by step guide](https://thenile.dev/docs/getting-started/languages/nextjs)

## Getting Started

### 1. Create a new database

Sign up for an invite to [Nile](https://thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

### 2. Create todo table

After you created a database, you will land in Nile's query editor. Since our application requires a table for storing all the "todos" this is a good time to create one:

```sql
    create table todos (id uuid DEFAULT (gen_random_uuid()), tenant_id uuid, title varchar(256), estimate varchar(256), embedding vector(768), complete boolean);
```

If all went well, you'll see the new table in the panel on the left hand side of the query editor. You can also see Nile's built-in tenant table next to it.

### 3. Getting credentials

In the left-hand menu, click on "Settings" and then select "Credentials". Generate credentials and keep them somewhere safe. These give you access to the database.

### 4. 3rd party credentials

This example uses AI chat and embedding models to generate automated time estimates for each task in the todo list. In order to use this functionality, you will
need access to models from a vendor with OpenAI compatible APIs. Make sure you have an API key, API base URL and the [names of the models you'll want to use](https://www.thenile.dev/docs/ai-embeddings/embedding_models).

### 5. Setting the environment

If you haven't cloned this project yet, now will be an excellent time to do so. Since it uses NextJS, we can use `create-next-app` for this:

```bash
npx create-next-app -e https://github.com/niledatabase/niledatabase/tree/main/examples/quickstart/nextjs nile-todo
cd nile-todo
```

Rename `.env.local.example` to `.env.local`, and fill in the username and password with the
credentials you picked up in the previous step. As well as the API key, URL and model names.

It should look something like this (you can see that I used Fireworks as the vendor, but you can use OpenAI or any compatible vendor):

```bash

# Private env vars that should never show up in the browser
# These are used by the server to connect to Nile database
NILE_USER = "0190995c-44ab-7ce3-9aef-31ef87dcd5f0"
NILE_PASSWORD = "73d32231-1d21-4990-a4f4-g6447507c271"

# Client (public) env vars

# the URL of this example + where the api routes are located
# Use this to instantiate Nile context for client-side components
NEXT_PUBLIC_APP_URL=http://localhost:3000/api

# Uncomment if you want to try Google Auth
# NEXT_PUBLIC_NILEDB_API_URL=
# AUTH_TYPE=google

AI_API_KEY=your-ai-vendor-api-key
AI_BASE_URL=https://api.fireworks.ai/inference/v1
AI_MODEL=accounts/fireworks/models/llama-v3p1-405b-instruct
EMBEDDING_MODEL=nomic-ai/nomic-embed-text-v1.5
```

Install dependencies with `yarn install` or `npm install`.

### 6. Running the app

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If all went well, your browser should show you the first page in the app, asking you to login or sign up.

After you sign up as a user of this example app, you'll be able to see this user by going back to Nile Console and running `select * from users` in the query editor.

Login with the new user, and you can create a new tenant and add tasks for the tenant. You can see the changes in your Nile database by running

```sql
select name, title, estimate, complete from
tenants join todos on tenants.id=todos.tenant_id
```

## Learn More

To learn more about how this example works and how to use Nile:

- [In depth explanation of this example](https://www.thenile.dev/docs/getting-started/languages/nextjs)
- [More about tenants in Nile](https://www.thenile.dev/docs/tenant-virtualization/tenant-management)
- [More about AI in Nile](https://www.thenile.dev/docs/ai-embeddings)
- [More on user authentication with Nile](https://www.thenile.dev/docs/user-authentication)
- [Nile's Javascript SDK reference](https://www.thenile.dev/docs/reference/sdk-reference)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Known Issues

### NodeJS 16.x

This example only wortks with Node 18 and above, because Nile SDK uses Node Fetch API, which was stabilized in Node 18.

Running on Node 16 will result in errors like:
`400 unable to parse json` or `400 email must not be empty` even on valid non-empty requests.
