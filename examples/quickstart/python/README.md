# Multi-tenant todo list app with Nile, Python, FastAPI and SqlAlchemy

This template shows how to build a SaaS app, using Nile, Serverless Postgres for SaaS, with Python, FastAPI and SqlAlchemy. The example app we'll build is a multi-tenant task manager.

- [Live demo - tbd]()
- [Video guide - tbd]()
- [Step by step guide - tbd]()


## Getting Started

### 1. Create a new database

Sign up for an invite to [Nile](https://thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

### 2. Create todo table

After you created a database, you will land in Nile's query editor. Since our application requires a table for storing all the "todos" this is a good time to create one:

```sql
    create table todos (id uuid, tenant_id uuid, title varchar(256), complete boolean);
```

If all went well, you'll see the new table in the panel on the left hand side of the query editor. You can also see Nile's built-in tenant table next to it.

### 3. Getting credentials

In the left-hand menu, click on "Settings" and then select "Credentials". Generate credentials and keep them somewhere safe. These give you access to the database.

### 4. Setting the environment

If you haven't cloned this repository yet, now will be an excellent time to do so.

```bash
git clone https://github.com/niledatabase/niledatabase
cd niledatabase/examples/quickstart/python
```
<!-- TODO FIX -->
Copy `.env.example` to `.env` and fill in the details of your Nile DB.

It should look something like this:
<!-- TODO FIX -->

Optional(but recommended) step is to set up a virtual Python environment:

```
python -m venv venv
source venv/bin/activate
```

Then, whether you have a virtual environment or not, install dependencies with `pip install -r requirements.txt`

## 5. Running the app

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
  --header 'X-Tenant-Id: 3c9bfcd0-7702-4e0e-b3f0-4e84221e20a7' \
  --data-raw '{"title": "feed the cat", "complete": false}'

# replace the tenant ID in the URL: 
curl  -b cookies -X GET \
  --header 'X-Tenant-Id: 3c9bfcd0-7702-4e0e-b3f0-4e84221e20a7' \
  'http://localhost:8000/api/todos' 

# you'll need to create another todo with another tenant to see anything different here
curl -X GET \
  'http://localhost:8000/api/insecure'
```

## Running a Docker Image

You can build and run a Docker image of this example by running:
```text
docker build -t todo-java .
docker run -p 8080:8080 todo-java
```

If you have Fly.io account, you can deploy on Fly.io by running:
```test
fly launch
fly deploy --ha=false
```

Make sure you use the `.dockerignore` file from this repo. Fly's generated .dockerignore ignores the main jar for this application.
