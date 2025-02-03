CREATE TABLE "auth"."user_group_memberships" (
	"id" uuid PRIMARY KEY NOT NULL,
	"groupId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth"."user_groups" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "auth"."user_group_memberships" ADD CONSTRAINT "user_group_memberships_groupId_user_groups_id_fk" FOREIGN KEY ("groupId") REFERENCES "auth"."user_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth"."user_group_memberships" ADD CONSTRAINT "user_group_memberships_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;