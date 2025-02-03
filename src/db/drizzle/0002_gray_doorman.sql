ALTER TABLE "auth"."user_group_memberships" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "auth"."user_groups" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "auth"."users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();