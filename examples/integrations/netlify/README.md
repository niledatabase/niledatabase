# Serverless multi-tenant todo list backend with Netlify Functions and Nile

This template shows how to use Nile in a serverless function deployed with Netlify. We use Express as the web framework and drizzle as the ORM.

- [Video guide]()
- [Live demo]()
- [Step by step guide]()

## Getting Started

### 1. Create a new database

Sign up for an invite to [Nile](https://console.thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

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
cd niledatabase/examples/integrations/netlify
```

In order to use Netlify's CI/CD build system, you'll also need a fork of this repository. You can create one by clicking the "Fork" button in the top right corner.

Rename `.env.example` to `.env`, and update it with the connection string you just copied from Nile Console. Make sure you don't include the word "psql". It should look something like this:

```bash
DATABASE_URL=postgres://018b778a-30df-7cdd-b55c-2f9664db39f3:ff3fb983-683c-4616-bbbc-519d8ddbbce5@db.thenile.dev:5432/gwen_db
```

Install dependencies with `npm install`.

### 5. Deployment

In order to deploy the example to Netlify, start by signing up for an account on [Netlify](https://www.netlify.com/) and connect your GitHub account.

You'll also want to make sure you have the [Netlify CLI](https://www.netlify.com/products/dev/), which you can install with `npm install -g netlify-cli`.

Once you've done that, initialize the project with Netlify:

```bash
netlify init
```

This will create a site in your Netlify account and connect it to the fork you created earlier. You can go to the Netlify site and check that it is configured correctly. The base directory should be set to `examples/integrations/netlify` and the functions folder to `examples/integrations/netlify/functions`.

Now you'll want to update environment variables for the site. You can do it from the CLI:

````bash
netlify env:import .env

You can run the site locally with:

```bash
netlify dev --cwd ./
````

and as the last step, you'll want to deploy the site:

```bash
netlify deploy
```

This will return a "draft URL" that you can use to explore the API. It will also link to the logs, so if anything went wrong, you'll be able to see it there.

Once you are happy with the result, you can run:

```bash
netlify deploy --prod
```

to deploy the application to the live URL. This will generate a "production URL" based on the site name you chose during the initialization step. In the examples below, I used the production URL of my demo site: `nile-netlify.netlify.app` - you'll want to replace it with the URL of your site.

### 6. Try it out

Now you can take the URL above and use `curl` to explore the APIs. Here are a few examples:

```bash
# create a tenant
curl --location --request POST 'https://nile-netlify.netlify.app/api/tenants' \
--user 'test-user:' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{"name":"my first customer"}'

# get tenants
curl  -X GET 'https://nile-netlify.netlify.app/api/tenants' --user 'test-user:'

# create a todo (don't forget to use a real tenant-id in the URL)
curl  -X POST \
  'https://nile-netlify.netlify.app/api/tenants/0191f72c-fe16-7ef7-b776-a8dc970fd65a/todos' \
  --user 'test-user:' \
  --header 'Content-Type: application/json' \
  --data-raw '{"title": "feed the cat", "complete": false}'

# list todos for tenant (don't forget to use a read tenant-id in the URL)
curl  -X GET \
  --user 'test-user:' \
  'https://nile-netlify.netlify.app/api/tenants/0191f72c-fe16-7ef7-b776-a8dc970fd65a/todos'

# list todos for all tenants
curl  -X GET \
  --user 'test-user:' \
  'https://nile-netlify.netlify.app/api/insecure/all_todos'
```
