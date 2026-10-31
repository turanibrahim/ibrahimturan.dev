import { createHash, randomBytes } from 'node:crypto';
import { copyFile, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { imageSize } from 'image-size';

const cmsDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectDirectory = path.resolve(cmsDirectory, '..');

try {
  process.loadEnvFile(path.resolve(cmsDirectory, '.env'));
} catch {
  // No local overrides to load.
}

const seedPath = path.resolve(cmsDirectory, 'seed/seed.json');
const localSeedPath = path.resolve(cmsDirectory, '.emdash/seed.local.json');
const schemaSeedPath = path.resolve(cmsDirectory, '.emdash/seed.schema.json');
const mediaSourceDirectory = path.resolve(projectDirectory, 'public/cms');
const mediaTargetDirectory = path.resolve(cmsDirectory, 'uploads');
const databasePath = process.env.EMDASH_DATABASE_URL
  ? path.resolve(cmsDirectory, process.env.EMDASH_DATABASE_URL.replace(/^file:/, ''))
  : path.resolve(cmsDirectory, 'data.db');
const emdashBinary = path.resolve(cmsDirectory, 'node_modules/.bin/emdash');

const crockfordAlphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

const createUlid = () => {
  const encode = (value, length) => {
    let remaining = value;
    let output = '';

    for (let index = 0; index < length; index += 1) {
      output = crockfordAlphabet[remaining % 32] + output;
      remaining = Math.floor(remaining / 32);
    }

    return output;
  };

  const time = encode(Date.now(), 10);

  return time + encode(randomBytes(10).readUIntBE(0, 6), 16);
};

const runSeed = ({ seedPath: inputPath, args }) =>
  new Promise((resolve, reject) => {
    const child = spawn(emdashBinary, ['seed', path.relative(cmsDirectory, inputPath), ...args], {
      cwd: cmsDirectory,
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`emdash seed exited with code ${code}`)),
    );
  });

const walk = ({ value, visit }) => {
  if (Array.isArray(value)) {
    return value.map((item) => walk({ value: item, visit }));
  }

  if (value === null || typeof value !== 'object') {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      visit({ key, value: walk({ value: item, visit }) }),
    ]),
  );
};

const collectMediaFilenames = (seed) => {
  const filenames = new Map();

  walk({
    value: seed,
    visit: ({ value }) => {
      const media = value.$media;

      if (media && typeof media.url === 'string') {
        filenames.set(media.filename, { alt: media.alt ?? '', url: media.url });
      }

      return value;
    },
  });

  return filenames;
};

const ensureMediaRows = async ({ filenames }) => {
  await mkdir(mediaTargetDirectory, { recursive: true });
  const database = new DatabaseSync(databasePath);
  const findExisting = database.prepare(
    'SELECT id, storage_key, width, height, mime_type FROM media WHERE filename = ? AND content_hash = ?',
  );
  const insertMedia = database.prepare(
    `INSERT INTO media (id, filename, mime_type, size, width, height, alt, caption, storage_key, content_hash, created_at, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, ?, 'ready')`,
  );
  const mediaValues = new Map();

  try {
    for (const [filename, reference] of filenames) {
      const sourcePath = path.resolve(mediaSourceDirectory, filename);

      if (path.basename(filename) !== filename) {
        throw new Error(`Unsafe media filename: ${filename}`);
      }

      const file = await readFile(sourcePath);
      const { height, type, width } = imageSize(file);
      const extension = path.extname(filename);
      const mimeType = `image/${type === 'jpg' ? 'jpeg' : type}`;
      const contentHash = `sha1:${createHash('sha1').update(file).digest('hex')}`;
      const existing = findExisting.get(filename, contentHash);

      if (existing) {
        mediaValues.set(filename, {
          provider: 'local',
          id: existing.id,
          alt: reference.alt,
          width: existing.width,
          height: existing.height,
          mimeType: existing.mime_type,
          filename,
          meta: { storageKey: existing.storage_key },
        });
        continue;
      }

      const mediaId = createUlid();
      const storageKey = `${mediaId}${extension}`;
      const { size } = await stat(sourcePath);

      await copyFile(sourcePath, path.resolve(mediaTargetDirectory, storageKey));
      insertMedia.run(
        mediaId,
        filename,
        mimeType,
        size,
        width,
        height,
        reference.alt,
        storageKey,
        contentHash,
        new Date().toISOString(),
      );
      mediaValues.set(filename, {
        provider: 'local',
        id: mediaId,
        alt: reference.alt,
        width,
        height,
        mimeType,
        filename,
        meta: { storageKey },
      });
    }
  } finally {
    database.close();
  }

  return mediaValues;
};

const replaceMedia = ({ seed, mediaValues }) =>
  walk({
    value: seed,
    visit: ({ key, value }) => {
      const reference = value.$media;

      if (!reference) {
        return value;
      }

      const mediaValue = mediaValues.get(reference.filename);

      if (!mediaValue) {
        throw new Error(`Unresolved media reference: ${reference.filename}`);
      }

      if (key === 'asset') {
        return { _type: 'reference', _ref: mediaValue.id, provider: 'local' };
      }

      return { ...mediaValue, alt: reference.alt || mediaValue.alt };
    },
  });

const seed = JSON.parse(await readFile(seedPath, 'utf8'));
const filenames = collectMediaFilenames(seed);
const schema = Object.fromEntries(Object.entries(seed).filter(([key]) => key !== 'content'));

await mkdir(path.dirname(schemaSeedPath), { recursive: true });
await writeFile(schemaSeedPath, `${JSON.stringify(schema, null, 2)}\n`, 'utf8');

try {
  await runSeed({ seedPath: schemaSeedPath, args: ['--on-conflict', 'skip'] });

  const mediaValues = await ensureMediaRows({ filenames });
  const localSeed = replaceMedia({ seed, mediaValues });

  await writeFile(localSeedPath, `${JSON.stringify(localSeed, null, 2)}\n`, 'utf8');
  await runSeed({ args: process.argv.slice(2), seedPath: localSeedPath });
} finally {
  await rm(schemaSeedPath, { force: true });
  await rm(localSeedPath, { force: true });
}

process.stdout.write(
  `Seeded ${filenames.size} media files into ${path.relative(projectDirectory, mediaTargetDirectory)}.\n`,
);
