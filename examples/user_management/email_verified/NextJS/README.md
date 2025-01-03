# Multi-tenant email verification

This template shows how to use Nile with multi-tenant email verification.

## Getting Started

### 1. Create a new database

Navigate to [Nile](https://console.thenile.dev) if you don't have one already and follow the prompts to create a new workspace and a database. If you have an existing database, great!

### 2. Configure email verifications

On the database settings page, you need to configure the Email provider to send emails. This will require a third party service, such as mailgun.

In your database on the left sidebar navigate to Tenants and Users > Configure. In the Email provider configuration, toggle "Send verification emails" and input your settings. You can test your mailer to be sure emails will be sent with the "Test email sending" button at the bottom.

### 3. Getting credentials

In the left-hand menu, click on "Settings" and then select "Connection". Click on the CLI icon, then "Generate credentials" which will complete the .env file. Copy these values.

### 4. Setting the environment

If you haven't cloned this project yet, now will be an excellent time to do so. Since it uses NextJS, we can use `create-next-app` for this:

```bash
npx create-next-app -e https://github.com/niledatabase/niledatabase/tree/main/examples/email_verified/NextJS email-verify-next
cd nile-todo
```

Create an `.env.local` file and paste in the values from step 3.

Install dependencies with `npm install`.

### 5. Running the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If all went well, your browser should show you the first page in the app, showing two options, one for sign in in with email and password, the other with just email.

Enter the test email you configured for your mailer and click the "Sign in with email". If everything went well, you should have an email linking back to the application that shows your user and meta data about them.

## Learn More

To learn more about how this example works and how to use Nile:

- [More about tenants in Nile](https://www.thenile.dev/docs/tenant-virtualization/tenant-management)
- [More on user authentication with Nile](https://www.thenile.dev/docs/user-authentication)
- [Nile's Javascript SDK reference](https://www.thenile.dev/docs/reference/sdk-reference)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
