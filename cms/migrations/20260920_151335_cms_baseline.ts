import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-sqlite';

export const up = async ({ db }: MigrateUpArgs): Promise<void> => {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`);
  await db.run(
    sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `);
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`);
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`);
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `);
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`);
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`);
  await db.run(sql`CREATE TABLE \`experiences_tech\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`experiences\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`experiences_tech_order_idx\` ON \`experiences_tech\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`experiences_tech_parent_id_idx\` ON \`experiences_tech\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`experiences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`company\` text,
  	\`start_date\` text,
  	\`end_date\` text,
  	\`summary\` text,
  	\`company_logo\` text,
  	\`company_url\` text,
  	\`location\` text,
  	\`order\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `);
  await db.run(sql`CREATE INDEX \`experiences_order_idx\` ON \`experiences\` (\`order\`);`);
  await db.run(
    sql`CREATE INDEX \`experiences_updated_at_idx\` ON \`experiences\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`experiences_created_at_idx\` ON \`experiences\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE INDEX \`experiences__status_idx\` ON \`experiences\` (\`_status\`);`);
  await db.run(sql`CREATE TABLE \`_experiences_v_version_tech\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_experiences_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_experiences_v_version_tech_order_idx\` ON \`_experiences_v_version_tech\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_experiences_v_version_tech_parent_id_idx\` ON \`_experiences_v_version_tech\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`_experiences_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_company\` text,
  	\`version_start_date\` text,
  	\`version_end_date\` text,
  	\`version_summary\` text,
  	\`version_company_logo\` text,
  	\`version_company_url\` text,
  	\`version_location\` text,
  	\`version_order\` numeric,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`experiences\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_experiences_v_parent_idx\` ON \`_experiences_v\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_experiences_v_version_version_order_idx\` ON \`_experiences_v\` (\`version_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_experiences_v_version_version_updated_at_idx\` ON \`_experiences_v\` (\`version_updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_experiences_v_version_version_created_at_idx\` ON \`_experiences_v\` (\`version_created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_experiences_v_version_version__status_idx\` ON \`_experiences_v\` (\`version__status\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_experiences_v_created_at_idx\` ON \`_experiences_v\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_experiences_v_updated_at_idx\` ON \`_experiences_v\` (\`updated_at\`);`,
  );
  await db.run(sql`CREATE INDEX \`_experiences_v_latest_idx\` ON \`_experiences_v\` (\`latest\`);`);
  await db.run(sql`CREATE TABLE \`projects_contributions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`projects_contributions_order_idx\` ON \`projects_contributions\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`projects_contributions_parent_id_idx\` ON \`projects_contributions\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`projects_stack\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(sql`CREATE INDEX \`projects_stack_order_idx\` ON \`projects_stack\` (\`_order\`);`);
  await db.run(
    sql`CREATE INDEX \`projects_stack_parent_id_idx\` ON \`projects_stack\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`projects_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(sql`CREATE INDEX \`projects_links_order_idx\` ON \`projects_links\` (\`_order\`);`);
  await db.run(
    sql`CREATE INDEX \`projects_links_parent_id_idx\` ON \`projects_links\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`engagement\` text,
  	\`ownership\` text,
  	\`summary\` text,
  	\`order\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `);
  await db.run(sql`CREATE INDEX \`projects_order_idx\` ON \`projects\` (\`order\`);`);
  await db.run(sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`);
  await db.run(sql`CREATE INDEX \`projects__status_idx\` ON \`projects\` (\`_status\`);`);
  await db.run(sql`CREATE TABLE \`_projects_v_version_contributions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_contributions_order_idx\` ON \`_projects_v_version_contributions\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_contributions_parent_id_idx\` ON \`_projects_v_version_contributions\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`_projects_v_version_stack\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_stack_order_idx\` ON \`_projects_v_version_stack\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_stack_parent_id_idx\` ON \`_projects_v_version_stack\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`_projects_v_version_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_links_order_idx\` ON \`_projects_v_version_links\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_links_parent_id_idx\` ON \`_projects_v_version_links\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`_projects_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_engagement\` text,
  	\`version_ownership\` text,
  	\`version_summary\` text,
  	\`version_order\` numeric,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(sql`CREATE INDEX \`_projects_v_parent_idx\` ON \`_projects_v\` (\`parent_id\`);`);
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_version_order_idx\` ON \`_projects_v\` (\`version_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_version_updated_at_idx\` ON \`_projects_v\` (\`version_updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_version_created_at_idx\` ON \`_projects_v\` (\`version_created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_version__status_idx\` ON \`_projects_v\` (\`version__status\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_created_at_idx\` ON \`_projects_v\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_updated_at_idx\` ON \`_projects_v\` (\`updated_at\`);`,
  );
  await db.run(sql`CREATE INDEX \`_projects_v_latest_idx\` ON \`_projects_v\` (\`latest\`);`);
  await db.run(sql`CREATE TABLE \`technologies\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`name\` text,
  	\`icon\` text,
  	\`category\` text,
  	\`years\` numeric,
  	\`level\` text,
  	\`order\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `);
  await db.run(sql`CREATE UNIQUE INDEX \`technologies_key_idx\` ON \`technologies\` (\`key\`);`);
  await db.run(sql`CREATE INDEX \`technologies_order_idx\` ON \`technologies\` (\`order\`);`);
  await db.run(
    sql`CREATE INDEX \`technologies_updated_at_idx\` ON \`technologies\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`technologies_created_at_idx\` ON \`technologies\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE INDEX \`technologies__status_idx\` ON \`technologies\` (\`_status\`);`);
  await db.run(sql`CREATE TABLE \`_technologies_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_key\` text,
  	\`version_name\` text,
  	\`version_icon\` text,
  	\`version_category\` text,
  	\`version_years\` numeric,
  	\`version_level\` text,
  	\`version_order\` numeric,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`technologies\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_technologies_v_parent_idx\` ON \`_technologies_v\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_technologies_v_version_version_key_idx\` ON \`_technologies_v\` (\`version_key\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_technologies_v_version_version_order_idx\` ON \`_technologies_v\` (\`version_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_technologies_v_version_version_updated_at_idx\` ON \`_technologies_v\` (\`version_updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_technologies_v_version_version_created_at_idx\` ON \`_technologies_v\` (\`version_created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_technologies_v_version_version__status_idx\` ON \`_technologies_v\` (\`version__status\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_technologies_v_created_at_idx\` ON \`_technologies_v\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_technologies_v_updated_at_idx\` ON \`_technologies_v\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_technologies_v_latest_idx\` ON \`_technologies_v\` (\`latest\`);`,
  );
  await db.run(sql`CREATE TABLE \`posts_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(sql`CREATE INDEX \`posts_tags_order_idx\` ON \`posts_tags\` (\`_order\`);`);
  await db.run(sql`CREATE INDEX \`posts_tags_parent_id_idx\` ON \`posts_tags\` (\`_parent_id\`);`);
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`excerpt\` text,
  	\`body_markdown\` text,
  	\`published_at\` text,
  	\`reading_time_minutes\` numeric,
  	\`source_url\` text,
  	\`order\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `);
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`);
  await db.run(sql`CREATE INDEX \`posts_order_idx\` ON \`posts\` (\`order\`);`);
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`);
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`);
  await db.run(sql`CREATE TABLE \`_posts_v_version_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_tags_order_idx\` ON \`_posts_v_version_tags\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_tags_parent_id_idx\` ON \`_posts_v_version_tags\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_excerpt\` text,
  	\`version_body_markdown\` text,
  	\`version_published_at\` text,
  	\`version_reading_time_minutes\` numeric,
  	\`version_source_url\` text,
  	\`version_order\` numeric,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`);
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_order_idx\` ON \`_posts_v\` (\`version_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`,
  );
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`);
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`);
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `);
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`);
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`experiences_id\` integer,
  	\`projects_id\` integer,
  	\`technologies_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`experiences_id\`) REFERENCES \`experiences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`technologies_id\`) REFERENCES \`technologies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_experiences_id_idx\` ON \`payload_locked_documents_rels\` (\`experiences_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_technologies_id_idx\` ON \`payload_locked_documents_rels\` (\`technologies_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`profile\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`surname\` text,
  	\`title\` text,
  	\`tagline\` text,
  	\`company\` text,
  	\`company_logo\` text,
  	\`company_url\` text,
  	\`introduction\` text,
  	\`email\` text,
  	\`location\` text,
  	\`profile_img_id\` integer,
  	\`github\` text,
  	\`linkedin\` text,
  	\`twitter\` text,
  	\`devto\` text,
  	\`education_university\` text,
  	\`education_department\` text,
  	\`education_start_year\` text,
  	\`education_end_year\` text,
  	\`education_location\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`profile_img_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(sql`CREATE INDEX \`profile_profile_img_idx\` ON \`profile\` (\`profile_img_id\`);`);
  await db.run(sql`CREATE INDEX \`profile__status_idx\` ON \`profile\` (\`_status\`);`);
  await db.run(sql`CREATE TABLE \`_profile_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_name\` text,
  	\`version_surname\` text,
  	\`version_title\` text,
  	\`version_tagline\` text,
  	\`version_company\` text,
  	\`version_company_logo\` text,
  	\`version_company_url\` text,
  	\`version_introduction\` text,
  	\`version_email\` text,
  	\`version_location\` text,
  	\`version_profile_img_id\` integer,
  	\`version_github\` text,
  	\`version_linkedin\` text,
  	\`version_twitter\` text,
  	\`version_devto\` text,
  	\`version_education_university\` text,
  	\`version_education_department\` text,
  	\`version_education_start_year\` text,
  	\`version_education_end_year\` text,
  	\`version_education_location\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_profile_img_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_profile_v_version_version_profile_img_idx\` ON \`_profile_v\` (\`version_profile_img_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_profile_v_version_version__status_idx\` ON \`_profile_v\` (\`version__status\`);`,
  );
  await db.run(sql`CREATE INDEX \`_profile_v_created_at_idx\` ON \`_profile_v\` (\`created_at\`);`);
  await db.run(sql`CREATE INDEX \`_profile_v_updated_at_idx\` ON \`_profile_v\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`_profile_v_latest_idx\` ON \`_profile_v\` (\`latest\`);`);
};

export const down = async ({ db }: MigrateDownArgs): Promise<void> => {
  await db.run(sql`DROP TABLE \`users_sessions\`;`);
  await db.run(sql`DROP TABLE \`users\`;`);
  await db.run(sql`DROP TABLE \`media\`;`);
  await db.run(sql`DROP TABLE \`experiences_tech\`;`);
  await db.run(sql`DROP TABLE \`experiences\`;`);
  await db.run(sql`DROP TABLE \`_experiences_v_version_tech\`;`);
  await db.run(sql`DROP TABLE \`_experiences_v\`;`);
  await db.run(sql`DROP TABLE \`projects_contributions\`;`);
  await db.run(sql`DROP TABLE \`projects_stack\`;`);
  await db.run(sql`DROP TABLE \`projects_links\`;`);
  await db.run(sql`DROP TABLE \`projects\`;`);
  await db.run(sql`DROP TABLE \`_projects_v_version_contributions\`;`);
  await db.run(sql`DROP TABLE \`_projects_v_version_stack\`;`);
  await db.run(sql`DROP TABLE \`_projects_v_version_links\`;`);
  await db.run(sql`DROP TABLE \`_projects_v\`;`);
  await db.run(sql`DROP TABLE \`technologies\`;`);
  await db.run(sql`DROP TABLE \`_technologies_v\`;`);
  await db.run(sql`DROP TABLE \`posts_tags\`;`);
  await db.run(sql`DROP TABLE \`posts\`;`);
  await db.run(sql`DROP TABLE \`_posts_v_version_tags\`;`);
  await db.run(sql`DROP TABLE \`_posts_v\`;`);
  await db.run(sql`DROP TABLE \`payload_kv\`;`);
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`);
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`);
  await db.run(sql`DROP TABLE \`payload_preferences\`;`);
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`);
  await db.run(sql`DROP TABLE \`payload_migrations\`;`);
  await db.run(sql`DROP TABLE \`profile\`;`);
  await db.run(sql`DROP TABLE \`_profile_v\`;`);
};
