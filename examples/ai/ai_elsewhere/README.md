# Small demo to show effects of database region on latency

We know in theory that deploying the app and the database in different regions will have impact on latency. But many developers, myself included,
are surprised by how much of a difference this can make.

This small example lets you generate embeddings for any PDF, and then it tells you how long this took.
You can play with this by deploying the application and the database in different regions - you'll be surprised by the differences you see!

- [Video guide - TBD]()

Note that you'll also need an OpenAI API key in order to run this demo.

## Getting Started

### 1. Create a new database

Sign up for an invite to [Nile](https://thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database. To see the latency effect, you'll want to create another database in another region and test both options.

### 2. Create file and embedding tables

After you created a database, you will land in Nile's query editor. This is a good time to create the tables we need:

```sql
    CREATE TABLE files (
  "id" UUID, -- intentionally not auto generating
  "tenant_id" UUID NOT NULL,
  "url"      TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "pages" INTEGER,
  chunks INTEGER,
  first_paragraph TEXT,
  time_to_index BIGINT,
  CONSTRAINT "file_pkey" PRIMARY KEY ("id", "tenant_id")
);


CREATE TABLE "file_embedding" (
  "tenant_id" UUID NOT NULL,
  "file_id" UUID NOT NULL,
  "embedding_id"  INTEGER NOT NULL,
  "embedding" vector(1024),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "pageContent" TEXT,
  CONSTRAINT "file_embedding_pkey" PRIMARY KEY ("tenant_id", "file_id","embedding_id"),
  CONSTRAINT "file_embedding_file_id_fkey" FOREIGN KEY ("file_id", "tenant_id") REFERENCES "file" ("id", "tenant_id")
);
```

If all went well, you'll see the new tables in the panel on the left hand side of the query editor. You can also see Nile's built-in tenant table next to it.

### 3. Getting credentials

In the left-hand menu, click on "Settings" and then select "Credentials". Generate credentials and keep them somewhere safe. These give you access to the database.

### 4. Setting the environment

If you haven't cloned this project yet, now will be an excellent time to do so. Since it uses NextJS, we can use `create-next-app` for this:

```bash
npx create-next-app -e https://github.com/niledatabase/niledatabase/tree/main/examples/ai/ai_elsewhere ai_elsewhere
cd ai_elsewhere
```

Rename `.env.local.example` to `.env.local`, and update it with your workspace and database name.
_(Your workspace and database name are displayed in the header of the Nile dashboard.)_
Also fill in the username and password with the credentials you picked up in the previous step.

It should look something like this:

```bash
# Client (public) env vars

# the URL of this example + where the api routes are located
# Use this to instantiate Nile context for client-side components
NEXT_PUBLIC_BASE_PATH=http://localhost:3000/api
NEXT_PUBLIC_WORKSPACE=todoapp_demo
NEXT_PUBLIC_DATABASE=demo_db_nextjs_qs

# Private env vars that should never show up in the browser
# These are used by the server to connect to Nile database
NILE_DB_HOST = "db.thenile.dev"
NILE_USER = "018ad484-0d52-7274-8639-057814be60c3"
NILE_PASSWORD = "0d11b8e5-fbbc-4639-be44-8ab72947ec5b"

# The URL of the Nile API
# Use this to instantiate Nile Server context for server-side use of the "api" SDK
NEXT_PUBLIC_NILE_API=https://api.thenile.dev

# Uncomment if you want to try Google Auth
# AUTH_TYPE=google

### AI ENV VARS ###

OPENAI_API_KEY=sk-MVYAN...

# For more options: https://platform.openai.com/docs/models
OPENAI_CHAT_MODEL_NAME="gpt-3.5-turbo"
# For more options: https://platform.openai.com/docs/guides/embeddings/embedding-models
OPENAI_EMBEDDING_MODEL_NAME="text-embedding-3-small"
# The dimension you specify here must match the dimensions of the embeddings column in the database
OPENAI_EMBEDDING_DIMENSIONS=1024
```

Install dependencies with `yarn install` or `npm install`.

### 5. Running the app

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
select name, title, complete from
tenants join todos on tenants.id=todos.tenant_id
```

## Learn More

To learn more about how this example works and how to use Nile:

- [In depth explanation of this example](https://www.thenile.dev/docs/getting-started/languages/nextjs)
- [More about tenants in Nile](https://www.thenile.dev//docs/tenant-management)
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
