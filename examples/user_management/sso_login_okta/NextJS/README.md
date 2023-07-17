# Okta Authentication with Nile in Next.js

This example demonstrates how to integrate an application with Nile to authenticate users with
Okta. It has a [companion guide]() in our docs.

> You need to have Okta configured in your Nile workspace to use this example.
> Read [the guide]() to learn how.

## Setup & Run

Install dependencies with `yarn install` or `npm install`.

Rename `.env.local.example` to `.env.local`, and update it with your workspace and database name.

_(Your workspace and database name are displayed in the header of the Nile dashboard.)_

Run the server with:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

and open [http://localhost:3000](http://localhost:3000).
