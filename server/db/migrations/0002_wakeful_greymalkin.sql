ALTER TYPE "keyboard_format_options" ADD VALUE '65%';--> statement-breakpoint
DROP INDEX IF EXISTS "price_index";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "keyboard_price_index" ON "keyboards" ("price");