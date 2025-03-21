-- CreateTable
CREATE TABLE "tenants" (
    "id" UUID NOT NULL DEFAULT public.uuid_generate_v7(),
    "name" TEXT,
    "created" TIMESTAMP(6) NOT NULL DEFAULT LOCALTIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT LOCALTIMESTAMP,
    "deleted" TIMESTAMP(6),

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

