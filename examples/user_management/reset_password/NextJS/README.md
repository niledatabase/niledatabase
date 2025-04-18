# 🔐 Password Reset with Nile Database

This project demonstrates authentication with **Nile Database** using the `@niledatabase/react` package.  
It includes a **password reset flow** with a **two-step process** for securely resetting user passwords.

---

## 🚀 Features

- **User Signup**
- **Password Reset (2-step process)**
  1. `PasswordResetRequestForm` → Sends a reset email.
  2. `PasswordResetForm` → Allows users to reset their password.
- **Seamless Nile Database Integration**
- **SMTP Configuration for Sending Emails**

---

## 🔧 Setup Instructions

### 1️⃣ Install Dependencies

First, install the required dependencies:

```sh
pnpm install
```

---

### 2️⃣ Configure Environment Variables

Generate database credentials in the **Connections** tab of your database settings at **[console.thenile.dev](https://console.thenile.dev)**.

Then, create a `.env.local` file and add:

```ini
NILEDB_USER=<your-niledb-user>
NILEDB_PASSWORD=<your-niledb-password>
NILEDB_API_URL=<your-niledb-api-url>
NILEDB_POSTGRES_URL=<your-niledb-postgres-url>
```

---

### 3️⃣ Configure Email Templates

To send password reset emails, **configure an SMTP server** in your Nile Database:

1. Go to **[console.thenile.dev](https://console.thenile.dev)**.
2. Under **"Tenants and Users"**, click **"Configure"**.
3. Navigate to **"Email Templates"**.
4. Set up your SMTP server with:
   - `user:password@smtpprovider:532`

⚠️ **Important:** Many SMTP providers require you to **whitelist test emails**. Be sure to use an email you have access to when testing.

---

## 🏃 Run the Application

Now, install dependencies and start the development server:

```sh
pnpm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser.  
You can:

- Sign up a new user and send a password reset email.
- Send a reset email to an existing user.

---
