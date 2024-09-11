# Google Authentication with Nile in Next.js

This example demonstrates how to integrate an application with Nile to authenticate users with
Google.

- [Live demo](https://niledatabase-google-sso.vercel.app)
- [Video guide - TBD](TBD)
- [Step by step guide](https://www.thenile.dev/docs/user-authentication/social-login/google)

> You need to have Google configured in your Nile workspace to use this example. See at the end of this README for detailed instructions.

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

## Connect Your Google and Nile Accounts

To ensure a secure exchange, your Google project and Nile database need to know a little bit about each other.

### 1. Enable Google in Nile

1. Open the Nile Console, and select the database for your application.
2. Click on the **Identity Providers** icon in the side navigation.
3. Click on the Google tile and flip the **Enabled** toggle on.
4. The client id and secret are values you'll obtain from Google. Leave these blank for now.
5. The **Redirect URI** is the page in your application that Nile redirects to after a user authenticates, or when an error occurs. For this example, enter `http://localhost:3000/api/auth/handler`.
6. Under **Callback URI**, click the **Copy** button to copy your database's callback URI to your clipboard. You'll need this when you configure Google. (The **Component URL** isn't necessary for this example; it's used for configuring the Nile UI component.)

### 2. Configure Google

1. Login to your [Google Cloud console](https://console.cloud.google.com/) and open the [credentials panel](https://console.cloud.google.com/apis/credentials) for your Google Cloud project.
2. Click **Create Credentials > OAuth client ID**.
3. In the **Application type** dropdown, select **Web Application** and give it a name, like "Nile Integration".
4. Under **Authorized redirect URIs**, past the **Callback URI** that you copied above.
5. Click **Create**. Google displays the **client id** and **client secret**. (The client id is the longer of the two, and will look something like `012345678901-e234mkac1qefclfum27kktf4c0jbnfuc.apps.googleusercontent.com`. The client secret is the shorter string and will look something like `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`.) Copy the generated values—you'll provide them to Nile.

### 3. Provide client credentials to Nile

1. Back in the Nile dashboard, enter the client id and secret that you obtained from Google.
2. Click **Save**.

With your Google and Nile accounts connected, your application can now authenticate users with Google accounts.

## Dig Deeper

### The GoogleLoginButton

In `/app/page.tsx`, you'll find a `<GoogleAuthPanel>` which wraps a `<GoogleLoginButton>` component from the Nile UI Kit. This component initiates an authentication request to your Nile database, which redirects to the Google authentication screen.

```tsx
export default function GoogleAuthPanel() {
  ...
  return (
    <NileProvider apiUrl={String(process.env.NILEDB_API_URL)}>
      <GoogleSSOButton />
    </NileProvider>
  );
}
```

### The Auth Redirect Handler

When the user successfully authenticates with Google, they are redirected to the URL you provided in your Nile configuration. In this example, that's `/api/auth/handler/route.ts`, which checks for errors and redirects to the `/dashboard` page on success. The dashboard displays the values that Nile sends you when an authentication attempt is resolved.

```ts
export async function POST(req: Request) {
  const formData = await req.formData();
  const event = formData.get("event");

  let location: string;

  if (event === "AUTH_ERROR") {
    const message = formData.get("error");
    location = redirectOnError(message ? message.toString() : "Unknown error");
  } else {
    location = redirectOnSuccess(formData);
  }

  return new Response(null, {
    headers: { Location: location },
    status: 302,
  });
}
```
