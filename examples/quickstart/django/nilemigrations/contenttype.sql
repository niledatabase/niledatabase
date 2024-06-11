BEGIN;
--
-- Create model ContentType
--
CREATE TABLE "django_content_type" (
"id" integer PRIMARY KEY, -- may need to replace with uuid and default, 
"app_label" varchar(100) NOT NULL, "model" varchar(100) NOT NULL,
   CONSTRAINT "django_content_type_app_label_model_76bd3d3b_uniq" UNIQUE ("app_label", "model")
);

COMMIT;