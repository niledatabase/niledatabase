# Multi-tenant AI-native todo list app with Nile and NextJS 13

This template shows how to use Nile with NextJS 13 for a multi-tenant AI-native todo list application.

- [Live demo](https://nextjs-quickstart-omega.vercel.app)
- [Video guide](https://www.youtube.com/watch?v=Eo0dDROnJGg)
- [Step by step guide](https://thenile.dev/docs/getting-started/languages/nextjs)

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/niledatabase/niledatabase/tree/main/examples/quickstart/nextjs&project-name=nile-todo&repository-name=nile-todo&stores=%5B%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22nile%22%2C%22productSlug%22%3A%22nile%22%7D%5D)

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
NILEDB_AUTH_MODE=password
NILEDB_USER="0190995c-44ab-7ce3-9aef-31ef87dcd5f0"
NILEDB_PASSWORD="73d32231-1d21-4990-a4f4-g6447507c271"

# Client (public) env vars

# the URL of this example + where the api routes are located
# Use this to instantiate Nile context for client-side components
NEXT_PUBLIC_APP_URL=http://localhost:3000/api

# Uncomment if you want to try Google Auth
# AUTH_TYPE=google

AI_API_KEY=your-ai-vendor-api-key
AI_BASE_URL=https://api.fireworks.ai/inference/v1
AI_MODEL=accounts/fireworks/models/llama-v3p1-405b-instruct
EMBEDDING_MODEL=nomic-ai/nomic-embed-text-v1.5
```

Install dependencies with `pnpm install`.

### 6. Running the app

```bash
pnpm run dev
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

### Marketplace OIDC

OIDC mode requires an enabled Nile resource, Vercel's resource-token feature, Node 20 or later, and a published `@niledatabase/server` release with the OAUTHBEARER client and `@niledatabase/server/vercel` helper. Update the SDK dependency and authoritative lockfile to that release before enabling OIDC. The existing SDK lockfile does not provide this helper. A release that sends resource tokens as passwords is incompatible. The source change alone does not upgrade the installed package. Selecting OIDC with an older package fails explicitly.

Set `NILEDB_AUTH_MODE=vercel-oidc` and provide the non-secret database ID, database name, API URL, published database DNS hostname, port, dedicated `NILEDB_OIDC_LOGIN_ID`, and `NILEDB_VERCEL_RESOURCE_ID`. The Vercel resource ID is different from the Nile database UUID. Keep these values on the server. Do not configure a competing connection string or save a minted token in an environment variable.

The server-only configuration loads the released helper without acquiring a token during module initialization. The helper supplies an explicit token provider, its OAUTHBEARER-capable client, and `db: { ssl: { rejectUnauthorized: true } }`. After a new physical connection negotiates OAUTHBEARER, the provider obtains the current workload identity and mints a default-claims resource token. It requests no role. Pool reuse does not mint again. The helper uses returned expiry rather than a five-minute refresh timer. Mint, provider, and certificate failures reject the connection without a password or plaintext retry. Use the published DNS hostname, not an IP address, and keep certificate and hostname verification enabled.

Use explicit `password` mode with separate local database credentials until Vercel's Marketplace mint is confirmed for local or preview use. Application sign-in and tenant authorization remain unchanged. Generic Vercel workload identity support does not establish Marketplace resource-token access for a build or preview context.

Establish dual mode before deploying OIDC. Redeploy every affected project and environment, verify sign-up, tenant selection and todo operations, and verify new physical connections after token expiry. Once an application uses OIDC, retain OIDC-capable backend services even while its old password remains. A password-only backend rollback requires redeploying every affected application to valid password mode and verifying new connections. If adoption is unknown, retain OIDC.

Vercel's final-rotation flag and resource/installation scope remain unpublished. Do not remove integration passwords manually or invent that action. Once the matching operation is available, wait for global and regional credential revocation, scheduled deletion, the fleet password-cache barrier and environment updates before declaring removal complete. Remove password-bearing URLs as well as `NILEDB_PASSWORD`. After removal starts, keep OIDC available and resume pending operations; do not recreate passwords automatically.

The [Vercel integration guide](https://www.thenile.dev/docs/integrations/vercel#marketplace-oidc-pilot) describes the same release and connection prerequisites. Do not send tokens to support; provide the mint HTTP status/error code and non-secret resource context.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Known Issues

### NodeJS 16.x

This example only wortks with Node 18 and above, because Nile SDK uses Node Fetch API, which was stabilized in Node 18.

Running on Node 16 will result in errors like:
`400 unable to parse json` or `400 email must not be empty` even on valid non-empty requests.
