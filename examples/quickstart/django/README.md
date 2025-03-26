# Multi-tenant todo list app with Nile and Django

This template shows how to use Nile with Django for a multi-tenant todo list application.

- [Live demo](TBD)
- [Video guide](TBD)
- [Step by step guide](TBD)

## Getting Started

### 1. Create a new database

Sign up for an invite to [Nile](https://thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

### 2. Create todo table

After you created a database, you will land in Nile's query editor. Since our application requires a table for storing all the "todos" this is a good time to create one:

```sql
    create table todos (
        id uuid default gen_random_uuid(),
        title varchar(100),
        created_date timestamp default now(),
        completed boolean default false,
        tenant_id uuid references tenants(id),
        PRIMARY KEY (tenant_id, id));
```

If all went well, you'll see the new table in the panel on the left hand side of the query editor. You can also see Nile's built-in tenant table next to it.

### 3. Models for Django's built-in applications

In the example, we use Django's contenttype, session and auth applications. Because we are not using Django migrations, we'll create the tables for these applications ourselves.

```sql
CREATE TABLE "django_content_type" (
    "id" integer PRIMARY KEY,
    "app_label" varchar(100) NOT NULL, "model" varchar(100) NOT NULL,
    CONSTRAINT "django_content_type_app_label_model_76bd3d3b_uniq" UNIQUE ("app_label", "model")
);

CREATE TABLE "django_session" ("session_key" varchar(40) NOT NULL PRIMARY KEY, "session_data" text NOT NULL, "expire_date" timestamp with time zone NOT NULL);
CREATE INDEX "django_session_session_key_c0390e0f_like" ON "django_session" ("session_key" varchar_pattern_ops);
CREATE INDEX "django_session_expire_date_a5c62663" ON "django_session" ("expire_date");
```

We implemented our own authentication backend, one that uses Nile's REST APIs and Nile's built-in user tables.
This lets us use Nile to enfore the permissions of each user to access tenant data.
Because of this, we don't need to create Django's authentication tables, but we need two small modifications to Nile's built-in tables:

```sql
alter table tenant_users add column id uuid default gen_random_uuid();

alter table users.users add column last_login timestamp default now();
```

### 4. Getting credentials

In the left-hand menu, click on "Settings" and then select "Credentials". Generate credentials and keep them somewhere safe. These give you access to the database.

While you are in the "Settings" section, you'll also want to copy:

- Database name
- API URL
- Postgres URL

You'll need all these in a second

### 4. Setting the environment

If you haven't cloned this project yet, now will be an excellent time to do so.

```bash
git clone https://github.com/niledatabase/niledatabase
cd niledatabase/examples/quickstart/django/todoapp
```

`todoapp` is the Django project directory. The application we are building is `todolist`.

Rename `.env.example` to `.env`, and fill it in with the values you just copied from Nile console.

It should look something like this:

```bash
# This is the base API URL for the Nile APIs, we use it for authentication services here
NILEDB_API_URL=https://eu-central-1.api.thenile.dev/databases/018ffae2-39e7-7ec8-8c53-17f7780f4486
# These are the credentials for the database we created in the Nile Console
NILEDB_USER=018ffae2-9522-7a7a-88c0-fe14b3f53c95
NILEDB_PASSWORD=3dd712e8-4b54-409e-856f-fb790341df46
NILEDB_HOST=eu-central-1.db.thenile.dev
NILEDB_NAME=django
```

Optional, but recommended, step is to set up a virtual Python environment:

```bash
python -m venv venv
source venv/bin/activate
```

Then, whether you have a virtual environment or not, install dependencies with:
```bash
pip install -r requirements.txt
```

### 5. Running the app

Start the Django server:

```bash
python manage.py runserver
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

If all went well, your browser should show you the first page in the app, asking you to login or sign up.

After you sign up as a user of this example app, you'll be able to see this user by going back to Nile Console and running `select * from users` in the query editor.

Login with the new user, and you can create a new tenant and add tasks for the tenant. You can see the changes in your Nile database by running

```sql
select name, title, complete from
tenants join todos on tenants.id=todos.tenant_id
```

## Learn More

To learn more about how this example works and how to use Nile:

- [In depth explanation of this example](TBD)
- [More about tenants in Nile](https://www.thenile.dev/docs/tenant-virtualization/tenant-management)
- [More on user authentication with Nile](https://www.thenile.dev/docs/user-authentication)
- [Nile's Javascript SDK reference](https://www.thenile.dev/docs/reference/sdk-reference)

## Few notes on how this example works

### Project setup

In `todoapp/settings.py` we set up the connection to Nile as a normal Postgres connection:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': NILEDB_NAME,
        'USER': NILEDB_USER,
        'PASSWORD': NILEDB_PASSWORD,
        'HOST': NILEDB_HOST,
        'PORT': '5432',
        'DISABLE_SERVER_SIDE_CURSORS': True
    }
}
```

In addition, we configured our own middleware for setting up tenant context, our own authentication backend and our own user model:

```python
AUTHENTICATION_BACKENDS = [
    'todolist.auth_backends.NileAuthBackend',
]

AUTH_USER_MODEL = 'todolist.Users'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'todoapp.middleware.NileTenantMiddleware',
]
```

The user model is defined in `todolist/models.py` and adapts Nile's built-in users table for use with Django by adding an implementation of `BaseUserManager`.
The authentication backend is defined in `todolist/auth_backends.py` and uses Nile's API to authentication, instead of checking credentials directly in the database.

`NileTenantMiddleware` is defined in `todoapp/middleware.py` and its job is to set the tenant context. It grabs the tenant ID from the request
(in this case from the path, but using `x-tenant-id` header is very common) and the user ID from the Django session, and it opens a database connection that sets both of them.
By authenticating the user, and then setting the tenant ID and user ID in the connection to Nile, the Middleware achieves two goals:

- Validate that the user has access to the tenant data, at the database level, in every request
- Every subsequent query will run in the virtual tenant database of the tenant we set.
  You can look at `todolist/views/todoitem_views.py` and see that we don't need to filter the todo list by the tenant_id.
  Because we are in this tenant's virtual database, Nile will only return todos for this tenant.
