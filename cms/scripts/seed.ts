import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '@payload-config';
import type { PortfolioContent } from '@/types/content';
import { getPayload } from 'payload';
import type { Profile } from '../payload-types';

const filename = fileURLToPath(import.meta.url);
const cmsDirectory = path.resolve(path.dirname(filename), '..');
const projectDirectory = path.resolve(cmsDirectory, '..');
const snapshotPath = path.resolve(projectDirectory, 'src/data/cms-content.json');
const publicDirectory = path.resolve(projectDirectory, 'public');
const managedCollections = ['media', 'experiences', 'projects', 'technologies', 'posts'] as const;
const localMediaPattern = /\/cms\/([^)\s"'?#]+)/g;
const markdownImagePattern = /!\[([^\]]*)\]\(\/cms\/([^)\s"'?#]+)\)/g;

const snapshot = JSON.parse(await readFile(snapshotPath, 'utf8')) as PortfolioContent;
const payload = await getPayload({ config });
const counts = await Promise.all(
  managedCollections.map((collection) => payload.count({ collection, overrideAccess: true })),
);
const existingProfile = (await payload.findGlobal({
  slug: 'profile',
  overrideAccess: true,
})) as Partial<Profile>;

if (counts.some(({ totalDocs }) => totalDocs > 0) || existingProfile.name) {
  throw new Error(
    'Seed requires an empty Payload database. Export existing edits before replacing it.',
  );
}

const mediaAltByFilename = new Map<string, string>();
const coverFilenameByPostSlug = new Map<string, string>();
const profileImageMatch = [...snapshot.profile.profileImg.matchAll(localMediaPattern)][0];

if (!profileImageMatch) {
  throw new Error(`Profile image must use a local /cms/ path: ${snapshot.profile.profileImg}`);
}

const profileImageFilename = decodeURIComponent(profileImageMatch[1]);
mediaAltByFilename.set(
  profileImageFilename,
  `${snapshot.profile.name} ${snapshot.profile.surname}`,
);

for (const post of snapshot.posts) {
  if (!post.imageUrl) {
    throw new Error(`Post cover is required: ${post.slug}`);
  }

  const coverImageMatch = [...post.imageUrl.matchAll(localMediaPattern)][0];

  if (!coverImageMatch) {
    throw new Error(`Post cover must use a local /cms/ path: ${post.slug}`);
  }

  const coverImageFilename = decodeURIComponent(coverImageMatch[1]);
  coverFilenameByPostSlug.set(post.slug, coverImageFilename);
  mediaAltByFilename.set(coverImageFilename, `${post.title} cover image`);

  for (const match of post.bodyMarkdown.matchAll(markdownImagePattern)) {
    const referencedFilename = decodeURIComponent(match[2]);
    const alt = match[1].trim() || `${post.title} article image`;
    mediaAltByFilename.set(referencedFilename, alt);
  }
}

const mediaIdByFilename = new Map<string, number>();

for (const [mediaFilename, alt] of mediaAltByFilename) {
  if (path.basename(mediaFilename) !== mediaFilename) {
    throw new Error(`Unsafe media filename: ${mediaFilename}`);
  }

  const mediaPath = path.resolve(publicDirectory, 'cms', mediaFilename);

  if (!mediaPath.startsWith(`${publicDirectory}${path.sep}`)) {
    throw new Error(`Media must resolve inside public/: ${mediaFilename}`);
  }

  await access(mediaPath);

  const media = await payload.create({
    collection: 'media',
    data: { alt },
    filePath: mediaPath,
    overrideAccess: true,
  });
  mediaIdByFilename.set(mediaFilename, media.id);
}

const profileMediaId = mediaIdByFilename.get(profileImageFilename);

if (profileMediaId === undefined) {
  throw new Error(`Profile media was not imported: ${profileImageFilename}`);
}

await payload.updateGlobal({
  slug: 'profile',
  data: {
    ...snapshot.profile,
    profileImg: profileMediaId,
    _status: 'published',
  },
  draft: false,
  overrideAccess: true,
});

for (const [order, experience] of snapshot.experiences.entries()) {
  await payload.create({
    collection: 'experiences',
    data: {
      ...experience,
      tech: experience.tech.map((name) => ({ name })),
      order,
      _status: 'published',
    },
    draft: false,
    overrideAccess: true,
  });
}

for (const [order, project] of snapshot.projects.entries()) {
  await payload.create({
    collection: 'projects',
    data: {
      ...project,
      contributions: project.contributions.map((text) => ({ text })),
      stack: project.stack.map((name) => ({ name })),
      links: project.links.map(({ label, url }) => ({ label, url })),
      order,
      _status: 'published',
    },
    draft: false,
    overrideAccess: true,
  });
}

for (const [order, technology] of snapshot.technologies.entries()) {
  await payload.create({
    collection: 'technologies',
    data: {
      category: technology.category,
      icon: technology.icon,
      key: technology.id,
      level: technology.level,
      name: technology.name,
      order,
      ...(technology.years === undefined ? {} : { years: technology.years }),
      _status: 'published',
    },
    draft: false,
    overrideAccess: true,
  });
}

for (const [order, post] of snapshot.posts.entries()) {
  const coverImageFilename = coverFilenameByPostSlug.get(post.slug);
  const coverImageId = coverImageFilename ? mediaIdByFilename.get(coverImageFilename) : undefined;

  if (coverImageId === undefined) {
    throw new Error(`Post cover media was not imported: ${post.slug}`);
  }

  await payload.create({
    collection: 'posts',
    data: {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      bodyMarkdown: post.bodyMarkdown,
      tags: post.tags.map((name) => ({ name })),
      publishedAt: post.publishedAt,
      readingTimeMinutes: post.readingTimeMinutes,
      language: post.language,
      coverImage: coverImageId,
      ...(post.sourceUrl ? { sourceUrl: post.sourceUrl } : {}),
      order,
      _status: 'published',
    },
    draft: false,
    overrideAccess: true,
  });
}

process.stdout.write(
  `Seeded 1 profile, ${snapshot.experiences.length} experiences, ${snapshot.projects.length} projects, ${snapshot.technologies.length} technologies, and ${snapshot.posts.length} posts.\n`,
);
