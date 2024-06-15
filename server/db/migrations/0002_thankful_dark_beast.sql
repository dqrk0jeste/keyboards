ALTER TYPE "switch_types" ADD VALUE 'silent';--> statement-breakpoint
DROP INDEX IF EXISTS "keycaps_price_index";--> statement-breakpoint
DROP INDEX IF EXISTS "switches_price_index";--> statement-breakpoint
ALTER TABLE "keyboards" ADD COLUMN "prebuilt" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "keycaps" DROP COLUMN IF EXISTS "price";--> statement-breakpoint
ALTER TABLE "switches" DROP COLUMN IF EXISTS "price";