-- CREATE SCHEMA "users";
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" uuid,
	"tenant_id" uuid,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"description" text,
	"holiday_wishes" text,
	"image_url" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "team_members_id_tenant_id_pk" PRIMARY KEY("id","tenant_id")
);
--> statement-breakpoint
-- CREATE TABLE "tenants" (
-- 	"id" uuid PRIMARY KEY NOT NULL,
-- 	"name" text NOT NULL,
-- 	"created_at" timestamp DEFAULT now()
-- );
--> statement-breakpoint
-- CREATE TABLE "users"."tenant_users" (
-- 	"user_id" uuid,
-- 	"tenant_id" uuid,
-- 	"role" text NOT NULL
-- );
--> statement-breakpoint
-- CREATE TABLE "users"."users" (
-- 	"id" uuid PRIMARY KEY NOT NULL,
-- 	"name" text NOT NULL,
-- 	"email" text NOT NULL,
-- 	"password" text NOT NULL,
-- 	"created_at" timestamp DEFAULT now(),
-- 	CONSTRAINT "users_email_unique" UNIQUE("email")
-- );
--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
--ALTER TABLE "users"."tenant_users" ADD CONSTRAINT "tenant_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users"."tenant_users" ADD CONSTRAINT "tenant_users_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;