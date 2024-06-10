DO $$ BEGIN
 CREATE TYPE "public"."keyboard_format_options" AS ENUM('60%', '65%', '75%', 'TKL', '100%');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."switch_types" AS ENUM('linear', 'tactile', 'clicky');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keyboard_colors" (
	"color" varchar(255) NOT NULL,
	"keyboard_id" uuid NOT NULL,
	"stock" integer NOT NULL,
	CONSTRAINT "keyboard_colors_color_keyboard_id_pk" PRIMARY KEY("color","keyboard_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keyboards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"is_bluetooth" boolean NOT NULL,
	"is_wireless" boolean NOT NULL,
	"format" "keyboard_format_options" NOT NULL,
	"price" integer NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keycaps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"main_color" varchar(255) NOT NULL,
	"accent_colors" varchar(255),
	"is_pudding" boolean NOT NULL,
	"price" integer NOT NULL,
	"stock" integer NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"keyboard_id" uuid NOT NULL,
	"switch_id" uuid NOT NULL,
	"keycap_id" uuid NOT NULL,
	"handlubed_switches" boolean NOT NULL,
	"extra_foam" boolean NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone_number" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"checkout_price" integer NOT NULL,
	"note" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "switches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" "switch_types" NOT NULL,
	"price" integer NOT NULL,
	"stock" integer NOT NULL,
	"description" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "keyboard_colors" ADD CONSTRAINT "keyboard_colors_keyboard_id_keyboards_id_fk" FOREIGN KEY ("keyboard_id") REFERENCES "public"."keyboards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_keyboard_id_keyboards_id_fk" FOREIGN KEY ("keyboard_id") REFERENCES "public"."keyboards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_switch_id_switches_id_fk" FOREIGN KEY ("switch_id") REFERENCES "public"."switches"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_keycap_id_keycaps_id_fk" FOREIGN KEY ("keycap_id") REFERENCES "public"."keycaps"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_index" ON "keyboards" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "keyboard_price_index" ON "keyboards" ("price");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "keycaps_price_index" ON "keycaps" ("price");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "switches_price_index" ON "switches" ("price");