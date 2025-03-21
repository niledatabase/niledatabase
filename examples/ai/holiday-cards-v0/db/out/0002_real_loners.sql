ALTER TABLE "team_members" ALTER COLUMN "id" SET DEFAULT public.uuid_generate_v7();--> statement-breakpoint
ALTER TABLE "team_members" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint