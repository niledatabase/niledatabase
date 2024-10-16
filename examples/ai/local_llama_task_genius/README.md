# Multi-tenant AI-native todo list app with Nile, LlamaIndex and Ollama

This template shows how to build a multi-tenant AI-native todo list application, using Nile with Python, FastAPI and SqlAlchemy.

- [Live demo](https://nile-python-quickstart.fly.dev/)
- [Video guide](https://youtu.be/t2UorKhAJko?feature=shared)
- [Step by step guide](https://www.thenile.dev/docs/getting-started/languages/python)

## Getting Started

### 1. Create a new database

Sign up for an invite to [Nile](https://thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

### 2. Create todo table

After you created a database, you will land in Nile's query editor. Since our application requires a table for storing all the "todos" this is a good time to create one:

```sql
    create table todos (id uuid, tenant_id uuid, title varchar(256), estimate varchar(256), complete boolean);
```

If all went well, you'll see the new table in the panel on the left hand side of the query editor. You can also see Nile's built-in tenant table next to it.

Note that the table does not have the embedding column. The embedding data will be managed by LlamaIndex and NileVectorStore, which will also create the table for storing the embeddings.

### 3. Getting credentials

In the left-hand menu, click on "Settings" and then select "Credentials". Generate credentials and keep them somewhere safe. These give you access to the database.

### 4. Install Ollama and models

This example uses Ollama to run models locally.

Go to[Ollama.com](https://ollama.com/), download and install Ollama. Make sure you install the CLI. 
Then, use the Ollama CLI to install the two models we will use:

```bash
ollama pull llama3.2
ollama pull nomic-embed-text
```

If you want to have fun chatting to your brand new llama, you can also use the Ollama CLI for this: `ollama run llama3.2`.

### 5. Setting the environment

If you haven't cloned this repository yet, now will be an excellent time to do so.

```bash
git clone https://github.com/niledatabase/niledatabase
cd niledatabase/examples/ai/local_llama_task_genius
```

Copy `.env.example` to `.env` and fill in the database connection string, which you copied from Nile in the previous step.
Note that it should start with `postgresql://` and **not** `postgres://`

It should look something like this:

```bash
DATABASE_URL=postgresql://user:password@db.thenile.dev:5432/mydb
LOG_LEVEL=DEBUG
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
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

If you've opted to build the UI, you can go to: `http://localhost:8000/` , sign up a user, create a tenant and create some todo lists.

Or you can check out the backend REST APIs with `curl`:

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

If you want to see all the data you created, you can go back to Nile Console and run a few queries:

```sql
select name, title, estimate, complete from
tenants join todos on tenants.id=todos.tenant_id

select * from users;
```
