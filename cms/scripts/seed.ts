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

const relativeProfileImage = snapshot.profile.profileImg.replace(/^\/+/, '');
const profileImagePath = path.resolve(publicDirectory, relativeProfileImage);

if (!profileImagePath.startsWith(`${publicDirectory}${path.sep}`)) {
  throw new Error(`Profile image must resolve inside public/: ${snapshot.profile.profileImg}`);
}

await access(profileImagePath);

const media = await payload.create({
  collection: 'media',
  data: {
    alt: `${snapshot.profile.name} ${snapshot.profile.surname}`,
  },
  filePath: profileImagePath,
  overrideAccess: true,
});

await payload.updateGlobal({
  slug: 'profile',
  data: {
    ...snapshot.profile,
    profileImg: media.id,
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
