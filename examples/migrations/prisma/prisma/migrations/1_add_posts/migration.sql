-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL DEFAULT public.uuid_generate_v7(),
    "tenant_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "posts_pkey" PRIMARY KEY ("id","tenant_id")
);

