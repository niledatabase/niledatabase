# Multi-tenant AI-native todo list app with Nile, Python, FastAPI and SqlAlchemy

This template shows how to build a multi-tenant AI-native todo list application, using Nile with Python, FastAPI and SqlAlchemy.

- [Live demo](https://nile-python-quickstart.fly.dev/)
- [Video guide](https://youtu.be/Axl63TUf2bc?feature=shared)
- [Step by step guide](https://www.thenile.dev/docs/getting-started/languages/python)

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

### 4. 3rd party credentials

This example uses AI chat and embedding models to generate automated time estimates for each task in the todo list. In order to use this functionality, you will need access to models from a vendor with OpenAI compatible APIs. Make sure you have an API key, API base URL and the [names of the models you'll want to use](https://www.thenile.dev/docs/ai-embeddings/embedding_models).

### 4. Setting the environment

If you haven't cloned this repository yet, now will be an excellent time to do so.

```bash
git clone https://github.com/niledatabase/niledatabase
cd niledatabase/examples/quickstart/python
```

Copy `.env.example` to `.env` and fill in the details of your Nile DB and your AI model vendor.

It should look something like this:

```bash
DATABASE_URL=postgresql://user:password@db.thenile.dev:5432/mydb
LOG_LEVEL=DEBUG
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# for AI estimates
AI_API_KEY=xHOdhtYABdcmqhqqgFezMf2kVBz9SKGj05xeaLVYMksuIA0T
AI_BASE_URL=https://api.fireworks.ai/inference/v1
AI_MODEL=accounts/fireworks/models/llama-v3p1-405b-instruct
EMBEDDING_MODEL=nomic-ai/nomic-embed-text-v1.5
```

Optional, but recommended, step is to set up a virtual Python environment:

```bash
python -m venv venv
source venv/bin/activate
```

Then, whether you have a virtual environment or not, install dependencies with `pip install -r requirements.txt`

## 5. Running the app

If you'd like to use the app with the UI, you'll want to build the UI assets first:

```bash
cd ui
npm install
npm run build
```

Then, whether or not you have UI, start the Python webapp:

```bash
uvicorn main:app --reload
```

## Try it out

This is a backend service that exposes REST APIs with the todo list functionality.
You can experiment with these APIs with `curl`:

```bash

# create user
curl -c cookies -X POST 'http://localhost:8000/api/sign-up' \
--header 'Content-Type: application/json' \
--data-raw '{"email":"test9@pytest.org","password":"foobar"}'

# login

curl -c cookies -X POST 'http://localhost:8000/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{"email":"test9@pytest.org","password":"foobar"}'

# create tenant
curl -b cookies -X POST 'localhost:8000/api/tenants' \
--header 'Content-Type: application/json' \
--data-raw '{"name":"my first customer"}'

# list tenants
curl -b cookies -X GET 'http://localhost:8000/api/tenants'

# replace the tenant ID in the URL:
curl -b cookies -X POST \
  'http://localhost:8000/api/todos' \
  --header 'Content-Type: application/json' \
  --header 'X-Tenant-Id: 179027f2-e184-4df7-a568-2be746898be2' \
  --data-raw '{"title": "implement a small todolist app", "complete": false}'

# replace the tenant ID in the URL:
curl  -b cookies -X GET \
  --header 'X-Tenant-Id: 179027f2-e184-4df7-a568-2be746898be2' \
  'http://localhost:8000/api/todos'

# you'll need to create another todo with another tenant to see anything different here
curl -X GET \
  'http://localhost:8000/api/insecure'
```

If you've opted to build the UI, you can go to: `http://localhost:8000/` , sign up a user, create a tenant and create some todo lists.
The frontend uses the backend APIs that we described above.

If you want to see all the data you created, you can go back to Nile Console and run a few queries:

```sql
select name, title, estimate, complete from
tenants join todos on tenants.id=todos.tenant_id

select * from users;
```

## Deploying on Fly

This repository includes example `fly.toml.example` file and `Procfile`. Assuming you have a fly login and CLI configured, you can deploy the app with:

```bash
fly launch
fly deploy --ha=false
```

You can refer to the example `fly.toml.example` for a working configuration.
