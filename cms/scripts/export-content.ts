import { access, copyFile, mkdir, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '@payload-config';
import type { PortfolioContent, Post as ExportedPost } from '@/types/content';
import { getPayload } from 'payload';

const filename = fileURLToPath(import.meta.url);
const cmsDirectory = path.resolve(path.dirname(filename), '..');
const projectDirectory = path.resolve(cmsDirectory, '..');
const contentPath = path.resolve(projectDirectory, 'src/data/cms-content.json');
const contentTemporaryPath = `${contentPath}.tmp`;
const mediaSourceDirectory = path.resolve(cmsDirectory, 'media');
const mediaDirectory = path.resolve(projectDirectory, 'public/cms');
const mediaTemporaryDirectory = path.resolve(projectDirectory, 'public/.cms-export.tmp');
const mediaBackupDirectory = path.resolve(projectDirectory, 'public/.cms-export.backup');
const remoteMarkdownImagePattern = /!\[[^\]]*\]\(https?:\/\//i;
const localMediaPattern = /\/cms\/([^)\s"'?#]+)/g;

const payload = await getPayload({ config });
const [profile, experiencesResult, projectsResult, technologiesResult, postsResult, mediaResult] =
  await Promise.all([
    payload.findGlobal({
      slug: 'profile',
      depth: 1,
      draft: false,
      overrideAccess: true,
    }),
    payload.find({
      collection: 'experiences',
      depth: 0,
      limit: 1000,
      overrideAccess: true,
      sort: 'order',
      where: { _status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'projects',
      depth: 0,
      limit: 1000,
      overrideAccess: true,
      sort: 'order',
      where: { _status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'technologies',
      depth: 0,
      limit: 1000,
      overrideAccess: true,
      sort: 'order',
      where: { _status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'posts',
      depth: 1,
      limit: 1000,
      overrideAccess: true,
      sort: 'order',
      where: { _status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'media',
      depth: 0,
      limit: 1000,
      overrideAccess: true,
    }),
  ]);

if (profile._status !== 'published') {
  throw new Error('Profile must be published before exporting.');
}

if (typeof profile.profileImg !== 'object' || !profile.profileImg.filename) {
  throw new Error('Published profile must reference an uploaded image.');
}

const profileImageFilename = path.basename(profile.profileImg.filename);

if (profileImageFilename !== profile.profileImg.filename) {
  throw new Error(`Unsafe media filename: ${profile.profileImg.filename}`);
}

const exportedPosts: ExportedPost[] = [];

for (const post of postsResult.docs) {
  if (typeof post.coverImage !== 'object' || !post.coverImage.filename) {
    throw new Error(`Published post "${post.title}" must reference an uploaded cover image.`);
  }

  const coverImageFilename = path.basename(post.coverImage.filename);

  if (coverImageFilename !== post.coverImage.filename) {
    throw new Error(`Unsafe post cover filename: ${post.coverImage.filename}`);
  }

  exportedPosts.push({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    bodyMarkdown: post.bodyMarkdown,
    tags: post.tags.map(({ name }) => name),
    publishedAt: post.publishedAt,
    readingTimeMinutes: post.readingTimeMinutes,
    language: post.language,
    imageUrl: `/cms/${encodeURIComponent(coverImageFilename)}`,
    ...(post.sourceUrl ? { sourceUrl: post.sourceUrl } : {}),
    order: post.order,
  });
}

const content: PortfolioContent = {
  profile: {
    name: profile.name,
    surname: profile.surname,
    title: profile.title,
    ...(profile.tagline ? { tagline: profile.tagline } : {}),
    company: profile.company,
    companyLogo: profile.companyLogo || '',
    companyUrl: profile.companyUrl || '',
    introduction: profile.introduction,
    email: profile.email,
    github: profile.github,
    location: profile.location,
    profileImg: `/cms/${encodeURIComponent(profileImageFilename)}`,
    linkedin: profile.linkedin,
    twitter: profile.twitter,
    devto: profile.devto,
    education: profile.education,
  },
  experiences: experiencesResult.docs.map((experience) => ({
    title: experience.title,
    company: experience.company,
    startDate: experience.startDate,
    ...(experience.endDate ? { endDate: experience.endDate } : {}),
    summary: experience.summary,
    companyLogo: experience.companyLogo,
    ...(experience.companyUrl ? { companyUrl: experience.companyUrl } : {}),
    location: experience.location,
    tech: experience.tech.map(({ name }) => name),
  })),
  projects: projectsResult.docs.map((project) => ({
    name: project.name,
    engagement: project.engagement,
    ownership: project.ownership,
    summary: project.summary,
    contributions: project.contributions.map(({ text }) => text),
    stack: project.stack.map(({ name }) => name),
    links: (project.links ?? []).map(({ label, url }) => ({ label, url })),
  })),
  technologies: technologiesResult.docs.map((technology) => ({
    id: technology.key,
    name: technology.name,
    icon: technology.icon,
    category: technology.category,
    ...(technology.years === null || technology.years === undefined
      ? {}
      : { years: technology.years }),
    level: technology.level,
  })),
  posts: exportedPosts,
};

const referencedMediaFilenames = new Set<string>([profileImageFilename]);

for (const post of content.posts) {
  const postContent = `${post.imageUrl ?? ''}\n${post.bodyMarkdown}`;

  if (remoteMarkdownImagePattern.test(post.bodyMarkdown)) {
    throw new Error(
      `Post "${post.title}" contains a remote Markdown image. Upload it to Payload Media and use a local /cms/ path.`,
    );
  }

  for (const match of postContent.matchAll(localMediaPattern)) {
    const referencedFilename = decodeURIComponent(match[1]);

    if (path.basename(referencedFilename) !== referencedFilename) {
      throw new Error(`Unsafe post media filename: ${referencedFilename}`);
    }

    referencedMediaFilenames.add(referencedFilename);
  }
}

const availableMediaFilenames = new Set(
  mediaResult.docs.flatMap((media) => (media.filename ? [media.filename] : [])),
);

for (const referencedFilename of referencedMediaFilenames) {
  if (!availableMediaFilenames.has(referencedFilename)) {
    throw new Error(`Referenced media is missing from Payload: ${referencedFilename}`);
  }

  await access(path.resolve(mediaSourceDirectory, referencedFilename));
}

await rm(mediaTemporaryDirectory, { force: true, recursive: true });
await rm(mediaBackupDirectory, { force: true, recursive: true });
await mkdir(mediaTemporaryDirectory, { recursive: true });
for (const referencedFilename of referencedMediaFilenames) {
  await copyFile(
    path.resolve(mediaSourceDirectory, referencedFilename),
    path.resolve(mediaTemporaryDirectory, referencedFilename),
  );
}
await writeFile(contentTemporaryPath, `${JSON.stringify(content, null, 2)}\n`, 'utf8');

let mediaBackupCreated = false;
let mediaActivated = false;

try {
  try {
    await rename(mediaDirectory, mediaBackupDirectory);
    mediaBackupCreated = true;
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;

    if (nodeError.code !== 'ENOENT') {
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
  `Exported ${content.experiences.length} experiences, ${content.projects.length} projects, ${content.technologies.length} technologies, and ${content.posts.length} posts.\n`,
);
