# Minimal example of connecting to Nile from AWS Lambda

This example connects to Nile every minute and runs two simple queries. It can be used for monitoring the database for example.

## Create todo table

This example requires a `todo` table:

```sql
  CREATE TABLE IF NOT EXISTS "todos" (
    "id" uuid DEFAULT gen_random_uuid(),
    "tenant_id" uuid,
    "title" varchar(256),
    "complete" boolean,
    CONSTRAINT todos_tenant_id_id PRIMARY KEY("tenant_id","id")
  );
```

### Getting credentials

In the left-hand menu, click on "Settings" and then select "Connection".

Click on the Postgres button, then click "Generate Credentials" on the top right corner. Copy the connection string - it should now contain the credentials we just generated.

## Dependencies

If needed, install Serverless framework:

```bash
npm install -g serverless
```

Rename `.env.example` to `.env`, and update it with the connection string you just copied from Nile Console. Make sure you don't include the word "psql". It should look something like this:

```bash
DATABASE_URL=postgres://018b778a-30df-7cdd-b55c-2f9664db39f3:ff3fb983-683c-4616-bbbc-519d8ddbbce5@db.thenile.dev:5432/gwen_db
```

Install dependencies with `npm install`.

## Deploy

```bash
serverless deploy
```

Note, if you are deploying in a new region, you need to add the DD monitoring layer:

```bash
npm install -g @datadog/datadog-ci
source ./.env
datadog-ci lambda instrument -f lambda-db-pinger-dev-rateHandler -r us-west-2 --env prod --service lambda_db_monitor -v 106 -e 55
```
