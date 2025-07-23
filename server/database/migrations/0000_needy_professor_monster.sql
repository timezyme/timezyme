CREATE TABLE `user_email_verification_codes` (
	`code` text NOT NULL,
	`expires_at` integer NOT NULL,
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_life_time_deals` (
	`amount` integer NOT NULL,
	`checkout_id` text NOT NULL,
	`customer_id` text NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`purchased_at` integer NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_oauth_accounts` (
	`created_at` integer,
	`id` text PRIMARY KEY NOT NULL,
	`provider_id` text NOT NULL,
	`provider_user_id` text NOT NULL,
	`updated_at` integer,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_provider_user` ON `user_oauth_accounts` (`provider_id`,`provider_user_id`);--> statement-breakpoint
CREATE TABLE `user_one_time_passwords` (
	`code` text NOT NULL,
	`expires_at` integer NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`type` text DEFAULT 'SIGNUP' NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_password_reset_tokens` (
	`code` text NOT NULL,
	`expires_at` integer NOT NULL,
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_subscriptions` (
	`amount` integer NOT NULL,
	`created_at` integer,
	`currency` text NOT NULL,
	`discount_id` text,
	`ends_at` integer,
	`id` text PRIMARY KEY NOT NULL,
	`modified_at` integer,
	`name` text NOT NULL,
	`price_id` text NOT NULL,
	`product_id` text NOT NULL,
	`recurring_interval` text NOT NULL,
	`started_at` integer,
	`status` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`avatar_url` text,
	`banned` integer DEFAULT false NOT NULL,
	`banned_reason` text,
	`created_at` integer,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`hashed_password` text,
	`id` text PRIMARY KEY NOT NULL,
	`last_active` integer,
	`name` text NOT NULL,
	`onboarded` integer DEFAULT false NOT NULL,
	`role` text DEFAULT 'USER' NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `waitlist` (
	`created_at` integer,
	`email` text NOT NULL,
	`email_verification_token` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`referrer` text,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_email_unique` ON `waitlist` (`email`);