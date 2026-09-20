import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const snapshotPath = path.resolve(projectDirectory, 'src/data/cms-content.json');
const publicDirectory = path.resolve(projectDirectory, 'public');
const localMediaPattern = /\/cms\/([^)\s"'?#]+)/g;
const remoteImagePattern = /(?:!\[[^\]]*\]\(|<img[^>]+src=["'])https?:\/\//i;
const content = JSON.parse(await readFile(snapshotPath, 'utf8'));
const errors = [];
const referencedMedia = new Set();
const slugs = new Set();

if (!Array.isArray(content.posts) || content.posts.length === 0) {
  errors.push('The exported content snapshot must contain at least one published blog post.');
}

if (typeof content.profile?.profileImg !== 'string') {
  errors.push('The exported profile must reference a local CMS image.');
} else {
  referencedMedia.add(content.profile.profileImg);
}

for (const [index, post] of (content.posts ?? []).entries()) {
  const label = post.slug || `post at index ${index}`;

  if (typeof post.slug !== 'string' || post.slug.length === 0) {
    errors.push(`Post at index ${index} is missing a slug.`);
  } else if (slugs.has(post.slug)) {
    errors.push(`Duplicate post slug: ${post.slug}`);
  } else {
    slugs.add(post.slug);
  }

  if (typeof post.title !== 'string' || post.title.length === 0) {
    errors.push(`${label} is missing a title.`);
  }

  if (typeof post.bodyMarkdown !== 'string' || post.bodyMarkdown.length === 0) {
    errors.push(`${label} is missing Markdown content.`);
  } else if (remoteImagePattern.test(post.bodyMarkdown)) {
    errors.push(`${label} contains a remote image. Upload it to CMS Media and use /cms/.`);
  }

  if (typeof post.imageUrl !== 'string' || !post.imageUrl.startsWith('/cms/')) {
    errors.push(`${label} must reference an uploaded CMS cover image.`);
  } else {
    referencedMedia.add(post.imageUrl);
  }

  if (Number.isNaN(Date.parse(post.publishedAt))) {
    errors.push(`${label} has an invalid publication date.`);
  }

  if (!Number.isFinite(post.readingTimeMinutes) || post.readingTimeMinutes <= 0) {
    errors.push(`${label} must have a positive reading time.`);
  }

  if (typeof post.language !== 'string' || post.language.length === 0) {
    errors.push(`${label} is missing a language.`);
  }

  if (!Array.isArray(post.tags) || post.tags.length === 0) {
    errors.push(`${label} must have at least one tag.`);
  }

  for (const match of (post.bodyMarkdown ?? '').matchAll(localMediaPattern)) {
    referencedMedia.add(`/cms/${match[1]}`);
  }
}

for (const mediaPath of referencedMedia) {
  let mediaFilename;

  try {
    mediaFilename = decodeURIComponent(mediaPath.slice('/cms/'.length));
  } catch {
    errors.push(`Invalid encoded media path: ${mediaPath}`);
    continue;
  }

  if (path.basename(mediaFilename) !== mediaFilename) {
    errors.push(`Unsafe media path: ${mediaPath}`);
    continue;
  }

  const absoluteMediaPath = path.resolve(publicDirectory, 'cms', mediaFilename);

  try {
    await access(absoluteMediaPath);
  } catch {
    errors.push(`Missing exported media file: ${mediaPath}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    process.stderr.write(`- ${error}\n`);
  }

  process.exitCode = 1;
} else {
  process.stdout.write(
    `Validated ${content.posts.length} published posts and ${referencedMedia.size} CMS media references.\n`,
  );
}
