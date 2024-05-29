CREATE TABLE IF NOT EXISTS "keyboards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" integer NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_index" ON "keyboards" ("name");