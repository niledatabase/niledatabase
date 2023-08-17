
![Title for Google SSO Template](https://github.com/niledatabase/niledatabase/assets/1189030/f8f70330-b737-4a91-a2bd-ef6a95220c71)

# Google Authentication with Nile in Next.js

This is a starter template that uses Nile in a NextJS app to authenticate users with Google.

* [Live demo](https://niledatabase-google-sso.vercel.app)
* [Video guide](https://drive.google.com/file/d/1BEewQNYaoGOFsDJ8Wc5a2Nb1IMsEdEtd/view?usp=sharing)
* [Step by steo guide](https://niledatabase-docs.vercel.app/user-management/quick-start/nextjs)

## Setup & Run 

**First and foremost, if you haven't already, [sign up for Nile](https://dev-nad.thenile.dev) and follow the prompts to create a workspace and
database.** 

Configure Google authentication in your Nile workspace, following the instructions in [the guide](https://niledatabase-docs.vercel.app/user-management/quick-start/nextjs).

Create a new Next.js project based on this template:

```bash
npx create-next-app -e https://github.com/niledatabase/niledatabase/tree/master/examples/user_management/social_login_google/NextJS nile-google-nextjs && cd nile-auth-app
```
Rename `.env.local.example` to `.env.local`, and update it with your workspace and database name. 
_(Your workspace and database name are displayed in the header of the Nile dashboard.)_

It should look something like this:

```
# Client (public) env vars

# the URL of this example + where the api routes are located
NEXT_PUBLIC_BASE_PATH=http://localhost:3000/api

# The URL of the Nile API
NILE_BASE_PATH=https://dev.khnum.thenile.dev

WORKSPACE=todoapp
DATABASE=test_db_4
```

Install dependencies with `yarn install` or `npm install`. 

Run the server with:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

and open [http://localhost:3000](http://localhost:3000).
