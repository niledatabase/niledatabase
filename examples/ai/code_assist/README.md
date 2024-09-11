# Autonomous Code Assistant - Code more, type less. Built with Nile and OpenAI to search an organization's codebase

This template shows how to use Nile to implement multitenancy, user management and vector embeddings, to build an application that helps browse and query new code-bases via chat. We generate and store embeddings for interesting projects/tenants in advance, and then when a user asks a question, we retrieve relevant code snippets and provide them to the LLM as context.
We then use streaming APIs to show the LLM response to the user.

Because of Nile's virtual tenant databases, the retrieved code snippets will only be from the tenant the user selected,
and Nile validates that the user has permissions to view this tenant's data. No risk of accidentally retrieving code that belongs to the wrong tenant.

- [Live demo](https://code-assist-nile.vercel.app/)
- [Step by step guide](https://www.thenile.dev/docs/getting-started/examples/code_assistant)
- [Video guide](https://youtu.be/hXQ7BRlp5a8?feature=shared)

## Getting Started

### 1. Create a new database

Sign up for an invite to [Nile](https://thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

### 2. Create tables

After you created a database, you will land in Nile's query editor. Create the following table for storing our embeddings per tenant:

```sql
            CREATE TABLE IF NOT EXISTS embeddings_openai_text3_large (
                tenant_id UUID ,
                id UUID DEFAULT gen_random_uuid (),
                file_id UUID,
                embedding  vector(1024) NOT NULL,
                primary key (tenant_id, id)
            );
```

We also need somewhere to store the code itself. It doesn't have to be Postgres - S3 or Github are fine. But Postgres is convenient in our example.

```sql
            CREATE TABLE IF NOT EXISTS file_content (
                tenant_id UUID ,
                project_id UUID,
                id UUID DEFAULT gen_random_uuid (),
                file_name VARCHAR(255) NOT NULL,
                contents  TEXT NOT NULL,
                primary key (tenant_id, project_id, id)
            );
```

and to store information about each project:

```sql
    CREATE TABLE IF NOT EXISTS projects (
        tenant_id UUID,
        id UUID DEFAULT gen_random_uuid (),
        name varchar(30),
        url varchar(1024),
        description TEXT,
        primary key (tenant_id, id)
    )
```

If all went well, you'll see the new tables in the panel on the left hand side of the query editor. You can also see Nile's built-in tenant table next to it.
You can also explore the schema in the "Schema Visualizer"

### 3. Getting Nile Credentials

In the left-hand menu, click on "Settings" and then select "Credentials". Generate credentials and keep them somewhere safe. These give you access to the database.
In addition, you'll need the API URL. You'll find it under "Settings" in the "General" page.

### 4. Third party dependencies

This project uses OpenAI for both embeddings and chat models. To run this example, you will need an OpenAI API keys.

This demo uses Google authentication for signup. You will need to configure this in both Google and Nile, following the instructions [in the example](https://github.com/niledatabase/niledatabase/blob/main/examples/user_management/social_login_google/NextJS/README.md).

### 5. Setting the environment

- If you haven't cloned this project yet, now will be an excellent time to do so. Since it uses NextJS, we can use `create-next-app` for this:

  ```bash
  npx create-next-app -e https://github.com/niledatabase/niledatabase/tree/main/examples/ai/code_assist code_assist
  cd code_assist
  ```

- Rename `.env.example` to `.env.local`, and update it with your Nile credentials, OpenAI credentials and (if using Google SSO) Nile's API URL.

- Install dependencies with `npm install`.

### 6. Generating Embeddings

You'll need to start by generating and storing embeddings for a few interesting projects.

- Start by cloning some interesting repos to your laptop. You can start with this examples repository, but any repo will work.
- Open `src/lib/OrgRepoEmbedder.ts`
- Edit the `await embedDirectory(...)'` calls to refer to your repos. It is typical to map each github organization to a Nile tenant and each repo to a project, but you can model this in any way that makes sense to you. Keep in mind that CodeAssist will only use embeddings from the current project and current tenant as context, so make sure each project is interesting enough to discuss.
- Run the embedder with `node --experimental-specifier-resolution=node --loader ts-node/esm --no-warnings src/lib/OrgRepoEmbedder.ts`
- The embedder automatically creates tenants, projects and embeddings for you. You can use Nile Console to view the data you just generated and double check that it all looks right.

### 7. Running the app

To run the app, simply:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If all went well, your browser should show you the first page in the app, asking you to login or sign up.

After you sign up as a user of this example app, you'll be able to see this user by going back to Nile Console and running `select * from users` in the query editor.

Once you choose a tenant, you can select a project, browse files, and most important - ask our CodeAssist any question about the projects you embedded.

## Learn More

To learn more about how this example works and how to use Nile:

- [More about AI and embeddings in Nile](https://www.thenile.dev/docs/ai-embeddings)
- [More about tenants in Nile](https://www.thenile.dev/docs/tenant-virtualization/tenant-management)
- [More on user authentication with Nile](https://www.thenile.dev/docs/user-authentication)
- [Nile's Javascript SDK reference](https://www.thenile.dev/docs/reference/sdk-reference)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
