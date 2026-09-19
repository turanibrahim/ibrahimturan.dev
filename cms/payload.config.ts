import { sqliteAdapter } from '@payloadcms/db-sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildConfig } from 'payload';
import { Experiences } from './collections/experiences';
import { Media } from './collections/media';
import { Posts } from './collections/posts';
import { Projects } from './collections/projects';
import { Technologies } from './collections/technologies';
import { Users } from './collections/users';
import { Profile } from './globals/profile';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const localDevelopmentSecret = 'local-only-payload-secret-do-not-use-in-production';

export default buildConfig({
  admin: {
    importMap: {
      baseDir: dirname,
    },
    user: Users.slug,
  },
  collections: [Users, Media, Experiences, Projects, Technologies, Posts],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./payload.db',
    },
  }),
  globals: [Profile],
  secret: process.env.PAYLOAD_SECRET || localDevelopmentSecret,
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  telemetry: false,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
