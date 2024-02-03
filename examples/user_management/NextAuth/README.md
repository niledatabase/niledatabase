# Multi-tenant todo list app using NextAuth

This template shows how to use Nile with NextAuth for a multi-tenant todo list application.

- [Live demo](https://nextauth-demo-delta.vercel.app/)
- [Video guide - TBD]()
- [Step by step guide](https://www.thenile.dev/docs/user-authentication/third-party/nextauth)

## Getting Started

### 1. Create a new database

Sign up for an invite to [Nile](https://thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

### 2. Create todo table

After you created a database, you will land in Nile's query editor. Since our application requires a table for storing all the "todos" this is a good time to create one:

```sql
    create table todos (id uuid DEFAULT (gen_random_uuid()), tenant_id uuid, title varchar(256), complete boolean);
```

If all went well, you'll see the new table in the panel on the left hand side of the query editor. You can also see Nile's built-in tenant table next to it.

### 3. Create tables for NextAuth data model

```sql
-- These are the extra tables NextAuth requires in your database to support

CREATE TABLE IF NOT EXISTS "accounts" (
    "userId" uuid NOT NULL,
    "type" text NOT NULL,
    "provider" text NOT NULL,
    "providerAccountId" text NOT NULL,
    "refresh_token" text,
    "access_token" text,
    "expires_at" integer,
    "token_type" text,
    "scope" text,
    "id_token" text,
    "session_state" text,
    CONSTRAINT account_provider_providerAccountId_pk PRIMARY KEY("provider","providerAccountId")
   -- ,CONSTRAINT "account_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users.users"("id") ON DELETE cascade ON UPDATE no action;
);

CREATE TABLE IF NOT EXISTS "sessions" (
    "sessionToken" text PRIMARY KEY NOT NULL,
    "userId" text NOT NULL,
    "expires" timestamp NOT NULL
    --,CONSTRAINT "session_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users.users"("id") ON DELETE cascade ON UPDATE no action;
);

CREATE TABLE IF NOT EXISTS "verification_token" (
    "identifier" text NOT NULL,
    "token" text NOT NULL,
    "expires" timestamp NOT NULL,
    CONSTRAINT verificationToken_identifier_token_pk PRIMARY KEY("identifier","token")
);

-- users table is built-in to Nile, but we need to extend it for NextAuth

alter table users.users add column "email_verified" timestamp;
```

Those should also show up on the left panel.

### 4. Getting credentials

In the left-hand menu, click on "Settings" and then select "Credentials". Generate credentials and keep them somewhere safe. These give you access to the database.

### 5. Setting the environment

If you haven't cloned this project yet, now will be an excellent time to do so. Since it uses NextJS, we can use `create-next-app` for this:

```bash
npx create-next-app -e https://github.com/niledatabase/niledatabase/tree/main/examples/user_management/NextAuth todo-nextauth
cd nile-todo
```

Rename `.env.local.example` to `.env.local`, and update it with your workspace and database name.
_(Your workspace and database name are displayed in the header of the Nile dashboard.)_
Also fill in the username and password with the credentials you picked up in the previous step.

Our example includes passwordless email and Github OAuth authentication.
To use either method, you'll want to fill in the appropriate section of the environment file.
You can refer to NextAuth getting started guides with [email](https://authjs.dev/getting-started/providers/email-tutorial) or [oauth](https://authjs.dev/getting-started/providers/oauth-tutorial) for more details.

The resulting env fileshould look something like this:

```bash
# Random string for encryption
NEXTAUTH_SECRET="random string. You should change this to something very random."

# For passwordless authentication, we need SMTP credentials
SMTP_USER=postmaster@youremaildomain.com
SMTP_PASSWORD=supersecret
SMTP_HOST=smtp.youremailhost.com
SMTP_PORT=587
EMAIL_FROM=someone@youremaildomain.com

# For Github OAuth, we need the client ID and secret we got when we registered with Github:
GITHUB_ID=Iv1.aa6f0f2bfa21b677
GITHUB_SECRET=b5b35282aa04bee94f31ccfaa44ed8c5e00fd2a9b2

# Private (backend) env vars for connecting to Nile database
NILE_DB_HOST = "db.thenile.dev"
NILE_USER =
NILE_PASSWORD =
NILE_DATABASE =

# Client (public) env vars

# the URL of this example + where the api routes are located
# Use this to instantiate Nile context for client-side components
NEXT_PUBLIC_BASE_PATH=http://localhost:3000/api
NEXT_PUBLIC_WORKSPACE=
NEXT_PUBLIC_DATABASE=
```

Install dependencies with `npm install`.

### 6. Running the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If all went well, your browser should show you the first page in the app, asking you to login or sign up.

After you sign up as a user of this example app, you'll be able to see this user by going back to Nile Console and running `select * from users.users` in the query editor.

Login with the new user, and you can create a new tenant and add tasks for the tenant. You can see the changes in your Nile database by running

```sql
select name, title, complete from
tenants join todos on tenants.id=todos.tenant_id
```

## Learn More

To learn more about how this example works and how to use Nile:

- [More about tenants in Nile](https://www.thenile.dev/docs/tenant-management)
- [More on user authentication with Nile](https://www.thenile.dev/docs/user-authentication)
- [Nile's Javascript SDK reference](https://www.thenile.dev/docs/reference/sdk-reference)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Known Issues

### NodeJS 16.x

This example only wortks with Node 18 and above, because Nile SDK uses Node Fetch API, which was stabilized in Node 18.

Running on Node 16 will result in errors like:
`400 unable to parse json` or `400 email must not be empty` even on valid non-empty requests.
