import { copyFile, mkdir, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { portableTextToMarkdown } from 'emdash/client';
import {
  EXPERIENCES_COLLECTION,
  POSTS_COLLECTION,
  PROFILE_COLLECTION,
  PROJECTS_COLLECTION,
  TECHNOLOGIES_COLLECTION,
  collections,
} from './content-model.mjs';

const cmsDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectDirectory = path.resolve(cmsDirectory, '..');
const databasePath = process.env.EMDASH_DATABASE_URL
  ? path.resolve(cmsDirectory, process.env.EMDASH_DATABASE_URL.replace(/^file:/, ''))
  : path.resolve(cmsDirectory, 'data.db');
const uploadsDirectory = path.resolve(cmsDirectory, 'uploads');
const contentPath = path.resolve(projectDirectory, 'src/data/cms-content.json');
const contentTemporaryPath = `${contentPath}.tmp`;
const mediaDirectory = path.resolve(projectDirectory, 'public/cms');
const mediaTemporaryDirectory = path.resolve(projectDirectory, 'public/.cms-export.tmp');
const mediaBackupDirectory = path.resolve(projectDirectory, 'public/.cms-export.backup');
const emdashBinary = path.resolve(cmsDirectory, 'node_modules/.bin/emdash');
const locales = ['en', 'tr'];
const defaultLocale = 'en';

const runExport = () =>
  new Promise((resolve, reject) => {
    const child = spawn(
      emdashBinary,
      ['export-seed', '--database', './data.db', '--with-content=all', '--pretty'],
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

const nonTranslatableFields = new Map(
  collections.map((collection) => [
    collection.slug,
    new Set(
      collection.fields.filter((field) => field.translatable === false).map((field) => field.slug),
    ),
  ]),
);

const pickNonTranslatable = ({ data, collection }) => {
  const fields = nonTranslatableFields.get(collection) ?? new Set();
  const picked = {};

  for (const field of fields) {
    if (data?.[field] !== undefined && data[field] !== null) {
      picked[field] = data[field];
    }
  }

  return picked;
};

const groupTranslations = (entries) => {
  const parents = new Map(entries.map((entry) => [entry.id, entry.id]));
  const find = (id) => {
    let current = id;

    while (parents.get(current) !== current) {
      current = parents.get(current);
    }

    return current;
  };
  const union = (left, right) => {
    const leftRoot = find(left);
    const rightRoot = find(right);

    if (leftRoot !== rightRoot) {
      parents.set(rightRoot, leftRoot);
    }
  };

  for (const entry of entries) {
    if (entry.translationOf && parents.has(entry.translationOf)) {
      union(entry.id, entry.translationOf);
    }
  }

  const groups = new Map();

  for (const entry of entries) {
    const root = find(entry.id);
    const group = groups.get(root) ?? new Map();

    if (entry.status !== 'published') {
      continue;
    }

    group.set(entry.locale ?? defaultLocale, entry);
    groups.set(root, group);
  }

  return [...groups.values()];
};

const localizeGroups = ({ groups, collection, fallbackToDefault = true }) =>
  Object.fromEntries(
    locales.map((locale) => {
      const entries = groups.map((group) => {
        const localized = group.get(locale);
        const canonical = group.get(defaultLocale);
        const source = localized ?? (fallbackToDefault ? canonical : undefined);

        if (!source) {
          return null;
        }

        return {
          ...source,
          locale,
          data: {
            ...pickNonTranslatable({ collection, data: canonical?.data }),
            ...source.data,
          },
        };
      });

      return [locale, entries.filter(Boolean)];
    }),
  );

const byOrder = (entries) =>
  [...entries].sort((left, right) => (left.data.order ?? 0) - (right.data.order ?? 0));

const toText = (value) => String(value ?? '');

const exported = JSON.parse(await runExport());
const database = new DatabaseSync(databasePath, { readOnly: true });
const mediaRows = database
  .prepare('SELECT id, filename, mime_type, width, height, alt, storage_key FROM media')
  .all();
database.close();

const mediaById = new Map(mediaRows.map((row) => [row.id, row]));
const mediaByStorageKey = new Map(mediaRows.map((row) => [row.storage_key, row]));
const referencedMedia = new Map();

const resolveMediaRow = (row) => {
  referencedMedia.set(row.filename, row);

  return { row, url: `/cms/${encodeURIComponent(row.filename)}` };
};

const resolveImageField = (value) => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  if (value.$media) {
    const storageKey = decodeURIComponent(value.$media.url.split('/').slice(-1)[0]);
    const row = mediaByStorageKey.get(storageKey);

    if (!row) {
      throw new Error(`Export references an unknown media file: ${value.$media.url}`);
    }

    return resolveMediaRow(row);
  }

  if (value.meta?.storageKey) {
    const row = mediaByStorageKey.get(value.meta.storageKey);

    if (!row) {
      throw new Error(`Export references an unknown media file: ${value.meta.storageKey}`);
    }

    return resolveMediaRow(row);
  }

  return null;
};

const toImage = (value, { alt } = {}) => {
  const resolved = resolveImageField(value);

  if (!resolved) {
    throw new Error('Published content is missing a required image.');
  }

  return {
    url: resolved.url,
    alt: alt || resolved.row.alt || value?.alt || '',
    mimeType: resolved.row.mime_type,
    width: resolved.row.width,
    height: resolved.row.height,
  };
};

const toPortableText = (blocks) =>
  (blocks ?? []).map((block) => {
    if (block._type !== 'image') {
      return block;
    }

    const row = mediaById.get(block.asset?._ref);

    if (!row) {
      throw new Error(`Portable text image references an unknown media file: ${block.asset?._ref}`);
    }

    const { url } = resolveMediaRow(row);

    return {
      ...block,
      alt: block.alt || row.alt || '',
      asset: { ...block.asset, url },
      width: row.width,
      height: row.height,
    };
  });

const profileGroups = localizeGroups({
  collection: PROFILE_COLLECTION,
  groups: groupTranslations(exported.content[PROFILE_COLLECTION] ?? []),
});
const experienceGroups = localizeGroups({
  collection: EXPERIENCES_COLLECTION,
  groups: groupTranslations(exported.content[EXPERIENCES_COLLECTION] ?? []),
});
const projectGroups = localizeGroups({
  collection: PROJECTS_COLLECTION,
  groups: groupTranslations(exported.content[PROJECTS_COLLECTION] ?? []),
});
const technologyGroups = localizeGroups({
  collection: TECHNOLOGIES_COLLECTION,
  groups: groupTranslations(exported.content[TECHNOLOGIES_COLLECTION] ?? []),
});
const postGroups = localizeGroups({
  collection: POSTS_COLLECTION,
  fallbackToDefault: false,
  groups: groupTranslations(exported.content[POSTS_COLLECTION] ?? []),
});

const toProfile = (entry) => {
  const { data } = entry;

  return {
    name: toText(data.name),
    surname: toText(data.surname),
    title: toText(data.title),
    tagline: data.tagline || undefined,
    company: toText(data.company),
    companyLogo: data.company_logo ?? '',
    companyUrl: data.company_url ?? '',
    introduction: toText(data.introduction),
    email: toText(data.email),
    github: data.github ?? '',
    linkedin: data.linkedin ?? '',
    twitter: data.twitter ?? '',
    devto: data.devto ?? '',
    location: toText(data.location),
    profileImg: toImage(data.profile_image).url,
    education: {
      university: toText(data.education_university),
      department: toText(data.education_department),
      startYear: toText(data.education_start_year),
      endYear: toText(data.education_end_year),
      location: toText(data.education_location),
    },
  };
};

const toExperience = (entry) => {
  const { data } = entry;

  return {
    title: toText(data.title),
    company: toText(data.company),
    startDate: toText(data.start_date),
    ...(data.end_date ? { endDate: data.end_date } : {}),
    summary: toText(data.summary),
    companyLogo: data.company_logo,
    ...(data.company_url ? { companyUrl: data.company_url } : {}),
    location: toText(data.location),
    tech: (data.tech ?? []).map(({ name }) => name),
  };
};

const toProject = (entry) => {
  const { data } = entry;

  return {
    name: toText(data.name),
    engagement: data.engagement,
    ownership: toText(data.ownership),
    summary: toText(data.summary),
    contributions: (data.contributions ?? []).map(({ text }) => text),
    stack: (data.stack ?? []).map(({ name }) => name),
    links: (data.links ?? []).map(({ label, url }) => ({ label, url })),
  };
};

const toTechnology = (entry) => {
  const { data } = entry;

  return {
    id: toText(data.key),
    name: toText(data.name),
    icon: data.icon ?? '',
    category: data.category,
    ...(data.years === null || data.years === undefined ? {} : { years: data.years }),
    level: data.level,
  };
};

const toPost = (entry) => {
  const { data, locale } = entry;
  const bodyPortableText = toPortableText(data.body);

  return {
    title: toText(data.title),
    slug: entry.slug,
    excerpt: toText(data.excerpt),
    bodyMarkdown: portableTextToMarkdown(bodyPortableText),
    bodyPortableText,
    tags: (data.tags ?? []).map(({ name }) => name),
    publishedAt: toText(data.published_on),
    readingTimeMinutes: data.reading_time,
    language: locale,
    image: toImage(data.cover),
    ...(data.source_url ? { sourceUrl: data.source_url } : {}),
    order: data.order,
  };
};

const content = Object.fromEntries(
  locales.map((locale) => [
    locale,
    {
      profile: toProfile(profileGroups[locale][0]),
      experiences: byOrder(experienceGroups[locale]).map(toExperience),
      projects: byOrder(projectGroups[locale]).map(toProject),
      technologies: byOrder(technologyGroups[locale]).map(toTechnology),
      posts: byOrder(postGroups[locale]).map(toPost),
    },
  ]),
);

const snapshot = { defaultLocale, locales, content };

await rm(mediaTemporaryDirectory, { force: true, recursive: true });
await rm(mediaBackupDirectory, { force: true, recursive: true });
await mkdir(mediaTemporaryDirectory, { recursive: true });

for (const row of referencedMedia.values()) {
  await copyFile(
    path.resolve(uploadsDirectory, row.storage_key),
    path.resolve(mediaTemporaryDirectory, row.filename),
  );
}

await writeFile(contentTemporaryPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');

let mediaBackupCreated = false;
let mediaActivated = false;

try {
  try {
    await rename(mediaDirectory, mediaBackupDirectory);
    mediaBackupCreated = true;
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  await rename(mediaTemporaryDirectory, mediaDirectory);
  mediaActivated = true;
  await rename(contentTemporaryPath, contentPath);
} catch (error) {
  if (mediaActivated) {
    await rm(mediaDirectory, { force: true, recursive: true });
  }

  if (mediaBackupCreated) {
    await rename(mediaBackupDirectory, mediaDirectory);
  }

  await rm(mediaTemporaryDirectory, { force: true, recursive: true });
  await rm(contentTemporaryPath, { force: true });
  throw error;
}

await rm(mediaBackupDirectory, { force: true, recursive: true });

process.stdout.write(
  `Exported ${locales.map((locale) => `${content[locale].posts.length} ${locale} posts`).join(', ')}, ${referencedMedia.size} media files.\n`,
);
