import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` ADD \`cover_image_id\` integer REFERENCES media(id);`);
  await db.run(
    sql`UPDATE \`posts\`
        SET \`cover_image_id\` = (
          SELECT \`media\`.\`id\`
          FROM \`media\`
          WHERE '/cms/' || \`media\`.\`filename\` = \`posts\`.\`image_url\`
        );`,
  );
  await db.run(sql`CREATE INDEX \`posts_cover_image_idx\` ON \`posts\` (\`cover_image_id\`);`);
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`image_url\`;`);
  await db.run(
    sql`ALTER TABLE \`_posts_v\` ADD \`version_cover_image_id\` integer REFERENCES media(id);`,
  );
  await db.run(
    sql`UPDATE \`_posts_v\`
        SET \`version_cover_image_id\` = (
          SELECT \`media\`.\`id\`
          FROM \`media\`
          WHERE '/cms/' || \`media\`.\`filename\` = \`_posts_v\`.\`version_image_url\`
        );`,
  );
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_cover_image_idx\` ON \`_posts_v\` (\`version_cover_image_id\`);`,
  );
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_image_url\`;`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`);
  await db.run(sql`CREATE TABLE \`__new_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`excerpt\` text,
  	\`body_markdown\` text,
  	\`published_at\` text,
  	\`reading_time_minutes\` numeric,
  	\`language\` text,
  	\`image_url\` text,
  	\`source_url\` text,
  	\`order\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `);
  await db.run(sql`INSERT INTO \`__new_posts\`("id", "title", "slug", "excerpt", "body_markdown", "published_at", "reading_time_minutes", "language", "image_url", "source_url", "order", "updated_at", "created_at", "_status")
    SELECT "id", "title", "slug", "excerpt", "body_markdown", "published_at", "reading_time_minutes", "language",
      '/cms/' || (SELECT "filename" FROM "media" WHERE "media"."id" = "posts"."cover_image_id"),
      "source_url", "order", "updated_at", "created_at", "_status"
    FROM \`posts\`;`);
  await db.run(sql`DROP TABLE \`posts\`;`);
  await db.run(sql`ALTER TABLE \`__new_posts\` RENAME TO \`posts\`;`);
  await db.run(sql`PRAGMA foreign_keys=ON;`);
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`);
  await db.run(sql`CREATE INDEX \`posts_order_idx\` ON \`posts\` (\`order\`);`);
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`);
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`);
  await db.run(sql`CREATE TABLE \`__new__posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_excerpt\` text,
  	\`version_body_markdown\` text,
  	\`version_published_at\` text,
  	\`version_reading_time_minutes\` numeric,
  	\`version_language\` text,
  	\`version_image_url\` text,
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
  await db.run(sql`INSERT INTO \`__new__posts_v\`("id", "parent_id", "version_title", "version_slug", "version_excerpt", "version_body_markdown", "version_published_at", "version_reading_time_minutes", "version_language", "version_image_url", "version_source_url", "version_order", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest")
    SELECT "id", "parent_id", "version_title", "version_slug", "version_excerpt", "version_body_markdown", "version_published_at", "version_reading_time_minutes", "version_language",
      '/cms/' || (SELECT "filename" FROM "media" WHERE "media"."id" = "_posts_v"."version_cover_image_id"),
      "version_source_url", "version_order", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest"
    FROM \`_posts_v\`;`);
  await db.run(sql`DROP TABLE \`_posts_v\`;`);
  await db.run(sql`ALTER TABLE \`__new__posts_v\` RENAME TO \`_posts_v\`;`);
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
}
