# Sales Insight

This example shows how to use Nile with Modal to build a sales insight application.

## Getting Started

### 1. Create a new database

Sign up for an invite to [Nile](https://thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

### 2. Create tables

After you created a database, you will land in Nile's query editor. Time to create a table for storing all the sales calls data.

```sql
create table call_chunks ( 
   tenant_id uuid,
   conversation_id varchar(50),
   chunk_id int,
   speaker_role varchar(20),
   content text,
   embedding vector(1536) -- must match the embedding model dimensions
);
```

### 3. Load data

We do this locally and not in Modal. No real reason, just ended up that way. Contributions welcome.

```bash
 python -m ingest.load_embeddings
```

### 4. Deploy the app

To deploy in development mode run:

```bash
modal serve web_app.py
```

This will start an "ephemeral app" on Modal, which will reload on code changes, output logs to the console, and exit when you enter ctrl-c.

To deploy for "production" run. This will continue running in Modal, and you can make changes to the code and deploy more versions. 
Note that Modal is Serverless - so even though the app will continue running, you will only pay for the resources it consumes when it actually executes 
(e.g. when the APIs are called):

```bash
modal deploy web_app.py
```

Once you deployed the app, you'll get a URL to access the app.
In our example it was  `https://gwenshap--sales-insight-web-fastapi-app-dev.modal.run`.

Replace this with your own URL in the following examples.

### 5. Try it out

```bash
# create user
curl -c cookies -X POST 'https://gwenshap--sales-insight-web-fastapi-app-dev.modal.run/api/sign-up' \
--header 'Content-Type: application/json' \
--data-raw '{"email":"test14@pytest.org","password":"foobar"}'

# login

curl -c cookies -X POST 'https://gwenshap--sales-insight-web-fastapi-app-dev.modal.run/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{"email":"test14@pytest.org","password":"foobar"}'


# list tenants
curl -b cookies -X GET 'https://gwenshap--sales-insight-web-fastapi-app-dev.modal.run/api/tenants'

# ask a question
curl -b cookies -X POST 'https://gwenshap--sales-insight-web-fastapi-app-dev.modal.run/api/chat?message=what%20were%20the%20customer%20pain%20points%3F' \
--header 'Content-Type: application/json' \
--header 'X-Tenant-Id: 01919b75-d63d-7642-90f9-6e90fc6cca6a'
```
