-- These are the extra tables NextAuth requires in your database to support

CREATE TABLE IF NOT EXISTS "accounts" (
    "userId" uuid NOT NULL,
    "type" text NOT NULL,
    "provider" text NOT NULL,
    "providerAccountId" text NOT NULL,
    "refresh_token" text,
    "access_token" text,
    "expires_at" integer,
    "token_type" text,
    "scope" text,
    "id_token" text,
    "session_state" text,
    CONSTRAINT account_provider_providerAccountId_pk PRIMARY KEY("provider","providerAccountId")
   -- ,CONSTRAINT "account_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users.users"("id") ON DELETE cascade ON UPDATE no action;
);

CREATE TABLE IF NOT EXISTS "sessions" (
    "sessionToken" text PRIMARY KEY NOT NULL,
    "userId" text NOT NULL,
    "expires" timestamp NOT NULL
    --,CONSTRAINT "session_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users.users"("id") ON DELETE cascade ON UPDATE no action;
);

CREATE TABLE IF NOT EXISTS "verification_token" (
    "identifier" text NOT NULL,
    "token" text NOT NULL,
    "expires" timestamp NOT NULL,
    CONSTRAINT verificationToken_identifier_token_pk PRIMARY KEY("identifier","token")
);

-- users table is built-in to Nile, but we need to extend it for NextAuth

alter table users.users add column "email_verified" timestamp;



