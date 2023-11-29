# Signup and Login with Nile in Next.js

This example demonstrates how to integrate an application with Nile to authenticate users with simple email and password authentication.

- [Live demo](https://email-authn.vercel.app)
- [Video guide - TBD](TBD)
- [Step by step guide](https://www.thenile.dev/docs/user-authentication/email-login/nextjs)

## Setup & Run

- Start by creating a database: Sign up for an invite to [Nile](https://thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

- Install dependencies with `yarn install` or `npm install`. 

- Rename `.env.local.example` to `.env.local`, and update it with your workspace and database name. _(Your workspace and database name are displayed in the header of the Nile dashboard.)_

- Run the server with:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

- Open [http://localhost:3000](http://localhost:3000) to try the app.

- You can now signup and login via the example app. Then you can switch back to Nile Console and see the users in your database with `select * from users.users`