DROP INDEX IF EXISTS "keyboard_price_index";--> statement-breakpoint
ALTER TABLE "keyboard_colors" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "keycaps" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "switches" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "keyboard_colors_price_index" ON "keyboard_colors" ("price");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "switces_price_index" ON "keycaps" ("price");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "switches_price_index" ON "switches" ("price");--> statement-breakpoint
ALTER TABLE "keyboards" DROP COLUMN IF EXISTS "price";