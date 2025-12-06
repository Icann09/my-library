ALTER TYPE "public"."borrow_status" ADD VALUE 'LATE RETURN';--> statement-breakpoint
ALTER TABLE "borrow_records" ADD COLUMN "receipt_is_generated" boolean DEFAULT false NOT NULL;