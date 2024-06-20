DO $$ BEGIN
 CREATE TYPE "public"."keyboard_format_options" AS ENUM('60%', '65%', '75%', 'TKL', '100%');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."switch_types" AS ENUM('linear', 'tactile', 'clicky', 'silent');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keyboard_colors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"color" varchar(255) NOT NULL,
	"keyboard_id" uuid NOT NULL,
	"stock" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keyboards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"is_bluetooth" boolean NOT NULL,
	"is_wireless" boolean NOT NULL,
	"format" "keyboard_format_options" NOT NULL,
	"has_RGB" boolean NOT NULL,
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
	"stock" integer NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"keyboard_color_id" uuid NOT NULL,
	"switch_id" uuid NOT NULL,
	"keycap_id" uuid NOT NULL,
	"handlubed_switches" boolean NOT NULL,
	"extra_foam" boolean NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone_number" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"checkout_price" integer NOT NULL,
	"note" text,
	"shipped_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "switches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" "switch_types" NOT NULL,
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
 ALTER TABLE "orders" ADD CONSTRAINT "orders_keyboard_color_id_keyboard_colors_id_fk" FOREIGN KEY ("keyboard_color_id") REFERENCES "public"."keyboard_colors"("id") ON DELETE no action ON UPDATE no action;
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
CREATE INDEX IF NOT EXISTS "keyboard_price_index" ON "keyboards" ("price");