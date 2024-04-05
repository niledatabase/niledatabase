# Google Authentication with Nile in Next.js

This example demonstrates how to integrate an application with Nile to authenticate users with
Google.

- [Live demo](https://niledatabase-google-sso.vercel.app)
- [Video guide - TBD](TBD)
- [Step by step guide](https://www.thenile.dev/docs/user-authentication/social-login/google)

> You need to have Google configured in your Nile workspace to use this example.
> Read [the guide](https://www.thenile.dev/docs/user-authentication/social-login/google) to learn how.

## Setup & Run

Install dependencies with `yarn install` or `npm install`.

Rename `.env.local.example` to `.env.local`, and update it with your database credentials, along with the database id.

_(Your database id is displayed in the database settings of the Nile dashboard.)_

Run the server with:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

and open [http://localhost:3000](http://localhost:3000).
