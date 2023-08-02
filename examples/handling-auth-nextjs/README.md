# Handling Authentication Redirects from Nile in Next.js

This starter app is a companion to our guide [Handling Redirects with Next.js](). It provides the 
basic scaffolding to help you understand ways you can handle the redirects that Nile sends to your
application after a user attempts to authenticate.

> You need to have Google configured in your Nile workspace to use this example.
> Read [this guide]() to learn how.

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
