# KnowledgeAI - Multi-tenant PDF search assistant. Built with Nile, OpenAI, UploadThing and NextJS 13

This template shows how to use Nile to implement multitenancy, user management and vector embeddings, to build an application that allow tenants to upload documents and have a conversation with them using a language model. The files are stored on UploadThing, with URIs, embeddings and chat history stored in Nile.

This example was contributed by Shreyas Chaliha aka Trace. The original version can be found in his [github account](https://github.com/trace2798/nile_ai_pdf).

- [Live demo](https://ai-pdf-tau.vercel.app/)
- [Step by step guide](https://www.thenile.dev/docs/getting-started/examples/chat_with_pdf)

## Getting Started

### 1. Create a new database

Sign up for an invite to [Nile](https://thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

### 2. Create tables

After you created a database, you will land in Nile's query editor. Since our application requires a few tables, this is a good time to create them:

```bash
CREATE TABLE "file" (
  "id" UUID DEFAULT (gen_random_uuid()),
  "tenant_id" UUID NOT NULL,
  "url"      TEXT,
  "key"      TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "user_id" UUID NOT NULL,
  "user_picture" TEXT,
  "user_name" TEXT,
  "isIndex" Boolean,
  "name" TEXT,
  "pageAmt" INTEGER,
  CONSTRAINT "file_pkey" PRIMARY KEY ("id", "tenant_id"),
  CONSTRAINT "unique_key_per_tenant" UNIQUE ("tenant_id", "key")
);


CREATE TABLE "file_embedding" (
  "id" UUID DEFAULT (gen_random_uuid()),
  "tenant_id" UUID NOT NULL,
  "file_id" UUID NOT NULL,
  "embedding_api_id"  UUID NOT NULL,
  "embedding" vector(1024),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "pageContent" TEXT,
  "location" TEXT,
  CONSTRAINT "file_embedding_pkey" PRIMARY KEY ("id", "tenant_id"),
  CONSTRAINT "file_embedding_file_id_fkey" FOREIGN KEY ("file_id", "tenant_id") REFERENCES "file" ("id", "tenant_id")
);

CREATE TABLE "message" (
  "id" UUID DEFAULT (gen_random_uuid()),
  "tenant_id" UUID NOT NULL,
  "text" TEXT,
  "isUserMessage" BOOLEAN,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "user_id" UUID NOT NULL,
  "user_picture" TEXT,
  "user_name" TEXT,
  "fileId" UUID,
  CONSTRAINT "message_pkey" PRIMARY KEY ("id", "tenant_id"),
  CONSTRAINT "message_fileId_fkey" FOREIGN KEY ("fileId", "tenant_id") REFERENCES "file" ("id", "tenant_id")
);

CREATE TABLE "user_subscription" (
  "id" UUID DEFAULT (gen_random_uuid()),
  "user_id" UUID NOT NULL,
  "tenant_id" UUID NOT NULL,
  "stripe_customer_id" TEXT,
  "stripe_subscription_id" TEXT,
  "stripe_price_id" TEXT,
  "stripe_current_period_end" TIMESTAMP,
  CONSTRAINT "subscription_pkey" PRIMARY KEY ("id", "tenant_id"),
  CONSTRAINT "user_subscription_user_id_fkey" FOREIGN KEY ("user_id", "tenant_id") REFERENCES users.tenant_users ("user_id", "tenant_id"),
  CONSTRAINT "unique_stripe_customer_id" UNIQUE ("stripe_customer_id", "tenant_id"),
  CONSTRAINT "unique_stripe_subscription_id" UNIQUE ("stripe_subscription_id", "tenant_id")
);

```

If all went well, you'll see the new tables in the panel on the left hand side of the query editor. You can also see Nile's built-in tenant table next to it.

### 3. Getting credentials

In the left-hand menu, click on "Settings" and then select "Credentials". Generate credentials and keep them somewhere safe. These give you access to the database.

### 4. Setting up Google Authentication

This demo uses Google authentication for signup. You will need to configure this in both Google and Nile, following the instructions [in the example](https://github.com/niledatabase/niledatabase/blob/main/examples/user_management/social_login_google/NextJS/README.md).

### 4. Setting up 3rd Party SaaS

This example requires a few more 3rd party SaaS accounts. You'll need to set them up and grab API keys to configure this example:

- [UploadThing](https://uploadthing.com): Used for storing PDFs
- [OpenAI](https://openai.com/): Used to generate embeddings of the uploaded documents and for the chat itself
- [Stripe](https://stripe.com/): This is optional: The application has a limited free tier and a more powerful paid tier. If you experiment with this app locally, you can enable Stripe subscriptions for the paid tier or you can just play with the free tier.

### 4. Setting the environment

- If you haven't cloned this project yet, now will be an excellent time to do so. Since it uses NextJS, we can use `create-next-app` for this:

  ```bash
  npx create-next-app -e https://github.com/niledatabase/niledatabase/tree/main/examples/quickstart/nextjs nile-todo
  cd nile-todo
  ```

- Rename `.env.example` to `.env.local`, and update it with your workspace and database name.
  _(Your workspace and database name are displayed in the header of the Nile dashboard.)_
  Fill in the username and password with the credentials you picked up in the previous step.
  And fill in the access keys for UploadThing and OpenAI.

- Install dependencies with `pnpm install`.

### 5. Running the app

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If all went well, your browser should show you the first page in the app, asking you to login or sign up.

After you sign up as a user of this example app, you'll be able to see this user by going back to Nile Console and running `select * from users` in the query editor. The app will also create a new tenant for you automatically, called "workspace". You can see it by running `select * from tenants`.

Once you choose a tenant, you can upload files by dropping them into the dropzone. They will upload and start indexing. After they are indexes successfully, you will be able to start a conversation with your files.

You can see the files, the embeddings and the conversation by querying `file`, `file_embedding` and `message` tables in Nile Console.

## Learn More

To learn more about how this example works and how to use Nile:

- [In depth explanation of this example](https://www.thenile.dev/docs/getting-started/languages/nextjs)
- [More about tenants in Nile](https://www.thenile.dev/docs/tenant-virtualization/tenant-management)
- [More on user authentication with Nile](https://www.thenile.dev/docs/user-authentication)
- [Nile's Javascript SDK reference](https://www.thenile.dev/docs/reference/sdk-reference)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
