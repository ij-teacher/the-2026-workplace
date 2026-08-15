CREATE TABLE `submissions` (
	`student_id` text PRIMARY KEY NOT NULL,
	`entered_at` text NOT NULL,
	`submitted_at` text,
	`progress` integer DEFAULT 0 NOT NULL,
	`answers` text DEFAULT '{}' NOT NULL
);
