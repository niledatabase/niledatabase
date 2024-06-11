BEGIN;
--
-- Create model Permission
--
CREATE TABLE "auth_permission" (
  "id" integer PRIMARY KEY, -- may need to replace with uuid and default
  "name" varchar(255) NOT NULL, 
  "content_type_id" integer NOT NULL, 
  "codename" varchar(100) NOT NULL,
  CONSTRAINT  "auth_permission_content_type_id_codename_01ab375a_uniq" UNIQUE ("content_type_id", "codename"),
  CONSTRAINT "auth_permission_content_type_id_2f476e4b_fk_django_co" FOREIGN KEY ("content_type_id") REFERENCES "django_content_type" ("id") DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX "auth_permission_content_type_id_2f476e4b" ON "auth_permission" ("content_type_id");

--
-- Create model Group
--
CREATE TABLE "auth_group" (
  "id" integer PRIMARY KEY, -- may need to replace with uuid and default
  "name" varchar(80) NOT NULL UNIQUE
);

CREATE INDEX "auth_group_name_a6ea08ec_like" ON "auth_group" ("name" varchar_pattern_ops);

commit;

begin;

CREATE TABLE "auth_group_permissions" (
  "id" bigint PRIMARY KEY -- may need to replace with uuid and default
  , "group_id" integer NOT NULL, "permission_id" integer NOT NULL,
  CONSTRAINT "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" UNIQUE ("group_id", "permission_id"),
  CONSTRAINT "auth_group_permissions_group_id_b120cbf9_fk_auth_group_id" FOREIGN KEY ("group_id") REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT "auth_group_permissio_permission_id_84c5c92e_fk_auth_perm" FOREIGN KEY ("permission_id") REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED
  );

CREATE INDEX "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions" ("group_id");
CREATE INDEX "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions" ("permission_id");

--
-- Create model User
--
CREATE TABLE "auth_user" (
  "id" integer PRIMARY KEY, -- may need to replace with uuid and default
  "password" varchar(128) NOT NULL, 
  "last_login" timestamp with time zone, 
  "is_superuser" boolean NOT NULL, 
  "username" varchar(30) NOT NULL UNIQUE, 
  "first_name" varchar(30) NOT NULL, 
  "last_name" varchar(30) NOT NULL, 
  "email" varchar(254) NOT NULL, 
  "is_staff" boolean NOT NULL, 
  "is_active" boolean NOT NULL, 
  "date_joined" timestamp with time zone NOT NULL);

CREATE INDEX "auth_user_username_6821ab7c_like" ON "auth_user" ("username" varchar_pattern_ops);
commit;

begin;

CREATE TABLE "auth_user_groups" (
  "id" bigint PRIMARY KEY, -- may need to replace with uuid and default
  "user_id" integer NOT NULL, 
  "group_id" integer NOT NULL,
  CONSTRAINT "auth_user_groups_user_id_group_id_94350c0c_uniq" UNIQUE ("user_id", "group_id"),
  FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED,
  FOREIGN KEY ("group_id") REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED
  );

CREATE INDEX "auth_user_groups_user_id_6a12ed8b" ON "auth_user_groups" ("user_id");
CREATE INDEX "auth_user_groups_group_id_97559544" ON "auth_user_groups" ("group_id");

CREATE TABLE "auth_user_user_permissions" (
  "id" bigint PRIMARY KEY, -- may need to replace with uuid and default
  "user_id" integer NOT NULL, "permission_id" integer NOT NULL,
  CONSTRAINT "auth_user_user_permissions_user_id_permission_id_14a6b632_uniq" UNIQUE ("user_id", "permission_id"),
  CONSTRAINT "auth_user_user_permissions_userenerneraaetr_id_a95ead1b_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT "auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm" FOREIGN KEY ("permission_id") REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED
  );

CREATE INDEX "auth_user_user_permissions_user_id_a95ead1b" ON "auth_user_user_permissions" ("user_id");
CREATE INDEX "auth_user_user_permissions_permission_id_1fbb5f2c" ON "auth_user_user_permissions" ("permission_id");
COMMIT;