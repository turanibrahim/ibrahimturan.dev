import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` ADD \`language\` text;`);
  await db.run(sql`ALTER TABLE \`posts\` ADD \`image_url\` text;`);
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_language\` text;`);
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_image_url\` text;`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`language\`;`);
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`image_url\`;`);
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_language\`;`);
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_image_url\`;`);
}
