-- CREATE SCHEMA "users";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users"."tenant_users" (
	"tenant_id" uuid,
	"user_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"created" timestamp,
	"updated" timestamp,
	"deleted" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos" (
	"id" uuid DEFAULT gen_random_uuid(),
	"tenant_id" uuid,
	"title" varchar(256),
	"estimate" varchar(256),
	"embedding" vector(768),
	"complete" boolean,
	CONSTRAINT "todos_tenant_id_id_pk" PRIMARY KEY("tenant_id","id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users"."users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"email" text
);
