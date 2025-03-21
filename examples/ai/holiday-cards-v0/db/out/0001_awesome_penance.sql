-- Custom SQL migration file, put your code below! --
ALTER TABLE "users"."users" ADD COLUMN "password" text NOT NULL;