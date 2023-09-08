# Multi-tenant todo list app with Nile, NodeJS and React

This template shows how to use Nile in NodeJS and React for a multi-tenant todo list application.

- [Live demo - TBD](TBD)
- [Video guide - TBD](TBD)
- [Step by step guide - TBD](TBD)

## Getting Started

### 1. Create a new database

Signup to Nile - https://dev-nad.thenile.dev and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

### 2. Create todo table

After you created a database, you will land in Nile's query editor. Since our application requires a table for storing all the "todos" this is a good time to create one:

```js
    create table todos (tenant_id uuid, title varchar(256), complete boolean);
```

If all went well, you'll see the new table in the panel on the left hand side of the query editor. You can also see Nile's built-in tenant table next to it.

### 3. Getting credentials

In the left-hand menu, click on "Settings" and then select "Credentials". Generate credentails and keep them somewhere safe. These give you access to the database.

### 4. Setting the environment

If you haven't cloned this repository yet, now will be an excellent time to do so.

```bash
git clone https://github.com/niledatabase/niledatabase
cd niledatabase/examples/quickstart/node_react
```

Rename `.env.example` to `.env`, and update it with your workspace and database name.
_(Your workspace and database name are displayed in the header of the Nile dashboard.)_
Also fill in the username and password with the credentials you picked up in the previous step.

It should look something like this:

```
NILE_BASE_PATH = "https://dev.khnum.thenile.dev"
NILE_DATABASE = "main"
NILE_WORKSPACE = "todoapp"
NILE_USER = "018a6b69-b1e9-7574-b8f3-efd5fe63d9bb"
NILE_PASSWORD = "d757518e-6d52-4bdb-b85f-f008c9f80097"
```

Install dependencies with `yarn install` or `npm install`.

### 5. Running the app

You can start both NodeJS api server and the React frontend with `npm start` or `yarn start`.

If all went well, your browser should show you the first page in the app, asking you to create a tenant. Feel free to create a tenant or 5.

If you click on "Explore" next to one of the tenants, you can start creating todo items for this tenant.

You can also try using the APIs directly. Here are a few examples:

```
# create a tenant
curl --location --request POST 'localhost:3001/tenants' \
--header 'Content-Type: application/json' \
--data-raw '{"name":"my first customer"}'

# get tenants
curl  -X GET 'http://localhost:3001/tenants'

# create a todo (don't forget to use a read tenant-id in the URL)
curl  -X POST \
  'http://localhost:3001/tenants/108124a5-2e34-418a-9735-b93082e9fbf2/todos' \
  --header 'Content-Type: application/json' \
  --data-raw '{"title": "feed the cat", "complete": false}'

# list todos for tenant (don't forget to use a read tenant-id in the URL)
curl  -X GET \
  'http://localhost:3001/tenants/108124a5-2e34-418a-9735-b93082e9fbf2/todos'

# list todos for all tenants
curl  -X GET \
  'http://localhost:3001/insecure/all_todos'
```

### 6. Running the app with Docker

You can build a docker container that runs this app, and exposes the webapp on port 3006 (the NodeJS and REST API are not exposed). To build and run the container:

```
docker build . -t todo-node-react
docker run -it -p3006:3006 todo-node-react
```

If you point your browser to http://localhost:3006, you'll see the first page of the app. 