import { mkdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { normalizeTranslations } from './translations.mjs';

const cmsDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

try {
  process.loadEnvFile(path.resolve(cmsDirectory, '.env'));
} catch {
  // No local overrides to load.
}

const databasePath = process.env.EMDASH_DATABASE_URL
  ? path.resolve(cmsDirectory, process.env.EMDASH_DATABASE_URL.replace(/^file:/, ''))
  : path.resolve(cmsDirectory, 'data.db');
const seedPath = path.resolve(cmsDirectory, 'seed/seed.json');
const temporarySeedPath = `${seedPath}.tmp`;
const emdashBinary = path.resolve(cmsDirectory, 'node_modules/.bin/emdash');

const runExport = () =>
  new Promise((resolve, reject) => {
    const child = spawn(
      emdashBinary,
      ['export-seed', '--database', databasePath, '--with-content=all', '--pretty'],
      { cwd: cmsDirectory, stdio: ['ignore', 'pipe', 'inherit'] },
    );
    let output = '';

    child.stdout.on('data', (chunk) => {
      output += chunk;
    });
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0
        ? resolve(output)
        : reject(new Error(`emdash export-seed exited with code ${code}`)),
    );
  });

const database = new DatabaseSync(databasePath, { readOnly: true });
const mediaById = new Map(
  database
    .prepare('SELECT id, filename, alt, storage_key FROM media')
    .all()
    .map((row) => [row.id, row]),
);
const mediaByStorageKey = new Map([...mediaById.values()].map((row) => [row.storage_key, row]));
database.close();

const toSeedMedia = ({ row, alt }) => ({
  $media: {
    url: `/cms/${encodeURIComponent(row.filename)}`,
    filename: row.filename,
    alt: alt ?? row.alt ?? '',
  },
});

const toSeedValue = ({ key, value }) => {
  if (Array.isArray(value)) {
    return value.map((item) => toSeedValue({ key, value: item }));
  }

  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (typeof value.$media?.url === 'string') {
    const storageKey = decodeURIComponent(value.$media.url.split('/').slice(-1)[0]);
    const row = mediaByStorageKey.get(storageKey);

    if (!row) {
      throw new Error(`Export references an unknown media file: ${value.$media.url}`);
    }

    return toSeedMedia({ alt: value.$media.alt, row });
  }

  if (key === 'asset' && value._type === 'reference') {
    const row = mediaById.get(value._ref);

    if (!row) {
      throw new Error(`Portable Text references an unknown media file: ${value._ref}`);
    }

    return toSeedMedia({ row });
  }

  return Object.fromEntries(
    Object.entries(value).map(([entryKey, entryValue]) => [
      entryKey,
      toSeedValue({ key: entryKey, value: entryValue }),
    ]),
  );
};

const exported = JSON.parse(await runExport());
const rewrittenContent = toSeedValue({ key: 'content', value: exported.content });
const seed = {
  ...exported,
  defaultLocale: exported.defaultLocale ?? 'en',
  content: Object.fromEntries(
    Object.entries(rewrittenContent).map(([collection, entries]) => [
      collection,
      normalizeTranslations({ defaultLocale: exported.defaultLocale ?? 'en', entries }),
    ]),
  ),
};

await mkdir(path.dirname(seedPath), { recursive: true });
await writeFile(temporarySeedPath, `${JSON.stringify(seed, null, 2)}\n`, 'utf8');
await rename(temporarySeedPath, seedPath);

const entryCount = Object.values(seed.content ?? {}).reduce(
  (total, entries) => total + entries.length,
  0,
);

process.stdout.write(
  `Refreshed seed/seed.json from the content database (${entryCount} entries).\n`,
);
