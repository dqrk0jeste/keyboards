DO $$ BEGIN
 CREATE TYPE "public"."keyboard_format_options" AS ENUM('60%', '75%', 'TKL', '100%');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"address" varchar(255) NOT NULL,
	"customer_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "customers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keyboard_colors" (
	"color" varchar(255) NOT NULL,
	"rgb_value" varchar(255) NOT NULL,
	"keyboard_id" uuid NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "keyboard_colors_color_keyboard_id_pk" PRIMARY KEY("color","keyboard_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keycaps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" integer NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cart" json NOT NULL,
	"customer_id" uuid,
	"address_id" uuid NOT NULL,
	"phone_number_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "phone_numbers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"phone_number" varchar(255) NOT NULL,
	"customer_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "switches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" integer NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "keyboards" ADD COLUMN "is_bluetooth" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "keyboards" ADD COLUMN "is_wireless" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "keyboards" ADD COLUMN "format" "keyboard_format_options" NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "keyboard_colors" ADD CONSTRAINT "keyboard_colors_keyboard_id_keyboards_id_fk" FOREIGN KEY ("keyboard_id") REFERENCES "public"."keyboards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_phone_number_id_phone_numbers_id_fk" FOREIGN KEY ("phone_number_id") REFERENCES "public"."phone_numbers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "phone_numbers" ADD CONSTRAINT "phone_numbers_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_index" ON "customers" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "keycaps_price_index" ON "keycaps" ("price");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "customer_index" ON "orders" ("customer_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "switches_price_index" ON "switches" ("price");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "price_index" ON "keyboards" ("price");