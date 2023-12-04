CREATE TABLE IF NOT EXISTS "poll" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(40),
	"question" text,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "poll_option" (
	"id" serial PRIMARY KEY NOT NULL,
	"poll_id" integer,
	"text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vote" (
	"id" serial PRIMARY KEY NOT NULL,
	"option_id" integer,
	"name" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "poll_option" ADD CONSTRAINT "poll_option_poll_id_poll_id_fk" FOREIGN KEY ("poll_id") REFERENCES "poll"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vote" ADD CONSTRAINT "vote_option_id_poll_option_id_fk" FOREIGN KEY ("option_id") REFERENCES "poll_option"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
