# Multi-tenant todo list backend service with Nile and Drizzle

This example shows how to use Nile with Drizzle ORM for an AI-native multi-tenant todo list application.

- [Video guide](TBD)
- [Step by step guide](TBD)

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
cd niledatabase/examples/integrations/cloudflare/
```

Install dependencies with `npm install`.

Login to your Cloudflare account by running:

```bash
npx wrangler login
```

You'll be redirected to a webpage asking you to login to Cloudflare. Once you do, you'll be asked to allow Wrangler to make changes to your Cloudflare account. Scroll down and select **Allow**.

Next, you'll want to configure [Hyperdrive](https://developers.cloudflare.com/hyperdrive/get-started/). Hyperdrive is a caching proxy for databases, accelerating global access to single-region databases. Run the following command, with the connection string you copied from Nile in step 3.

```bash
npx wrangler hyperdrive create your_config_name --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/mydb"
```

You can use any unique string instead of `your_config_name`. If all went well, you'll get a response with your Hyperdrive config ID that you can copy into `wrangler.toml`.

Copy `wrangler.toml.example` to `wrangler.toml` and edit it with this Hyperdrive ID and the Nile connection string (for local testing). Your `wrangler.toml` should look like this:

```toml
name = "nile_drizzle_example"
main = "src/app.ts"
compatibility_date = "2024-12-06"
compatibility_flags = [ "nodejs_compat", "no_handle_cross_request_promise_resolution"]

assets = { directory = "public" }

[vars]
# uncomment if you don't use hyperdrive, and note that you need to update the env variable in src/db/db.ts
# DATABASE_URL = "postgres://01939840-ef4a-76d9-b78c-b0489190388f:b63b043d-c81b-45b8-bade-35ea02ebc480@us-west-2.db.dev.thenile.dev/niledb_indigo_house"

[[hyperdrive]]
binding = "HYPERDRIVE"
id = "b763b85e57524c45850f9189a68e018c"
localConnectionString = "postgres://01939840-ef4a-76d9-b78c-b0489190388f:b63b043d-c81b-45b8-bade-35ea02ebc480@us-west-2.db.dev.thenile.dev/niledb_indigo_house"
```

### 5. Running the app

To run the app locally:

```bash
npm run dev
```

It will start a local dev worker and suggest clicking `b` to open the app. Click `b` or just point your browser to `http://localhost:8787` and you'll see a welcome page with some `curl` commands - these allow you to interact with the worker you just deployed - create tenants, create tasks, list tasks, etc.

To deploy the app to Cloudflare:

```bash
npm run deploy
```

It will return with a URL where your worker is running. You can enter this URL in a browser, and see a welcome screen with `curl` commands that will let you interact with this app.
