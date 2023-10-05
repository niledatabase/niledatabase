# Signup and Login with Nile in Next.js

This example demonstrates how to integrate an application with Nile to authenticate users with simple email and password authentication.

- [Live demo - TBD](TBD)
- [Video guide - TBD](TBD)
- [Step by step guide - TBD](https://niledatabase-www.vercel.app/docs/user-authentication/quick-start/nextjs)

## Setup & Run

- If you haven't already, you need to create a database: Signup to Nile - https://console.thenile.dev and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

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

- You can now signup and login via the example app. Then you can switch back to [Nile Console](https://console.thenile.dev) and see the users in your database with `select * from users`