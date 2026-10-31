import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const snapshotPath = path.resolve(projectDirectory, 'src/data/cms-content.json');
const publicDirectory = path.resolve(projectDirectory, 'public');
const calendarMonthPattern = /^\d{4}-\d{2}$/;
const blockTypes = new Set(['block', 'code', 'image']);
const spanTypes = new Set(['span']);
const knownMarks = new Set(['strong', 'em', 'code', 'underline', 'strike-through']);
const content = JSON.parse(await readFile(snapshotPath, 'utf8'));
const errors = [];
const referencedMedia = new Set();

const fail = (message) => {
  errors.push(message);
};

const collectMedia = ({ mediaPath, label }) => {
  let filename;

  try {
    filename = decodeURIComponent(mediaPath.slice('/cms/'.length));
  } catch {
    fail(`${label} has an invalid encoded media path: ${mediaPath}`);
    return;
  }

  if (path.basename(filename) !== filename) {
    fail(`${label} has an unsafe media path: ${mediaPath}`);
    return;
  }

  referencedMedia.add(filename);
};

const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;

const validateImage = ({ image, label, required }) => {
  if (image === undefined && !required) {
    return;
  }

  if (!image || typeof image !== 'object') {
    fail(`${label} must include structured image metadata.`);
    return;
  }

  if (typeof image.url !== 'string' || !image.url.startsWith('/cms/')) {
    fail(`${label} must reference an uploaded CMS image.`);
  } else {
    collectMedia({ label, mediaPath: image.url });
  }

  if (typeof image.alt !== 'string' || image.alt.trim().length === 0) {
    fail(`${label} must include alt text.`);
  }

  if (typeof image.mimeType !== 'string' || !image.mimeType.startsWith('image/')) {
    fail(`${label} must include an image MIME type.`);
  }

  if (!isPositiveInteger(image.width) || !isPositiveInteger(image.height)) {
    fail(`${label} must include positive integer dimensions.`);
  }
};

const validatePortableText = ({ blocks, label }) => {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    fail(`${label} is missing Portable Text content.`);
    return;
  }

  for (const [index, block] of blocks.entries()) {
    const blockLabel = `${label} block ${index}`;

    if (!blockTypes.has(block?._type)) {
      fail(`${blockLabel} uses an unsupported type: ${String(block?._type)}`);
      continue;
    }

    if (block._type === 'code') {
      if (typeof block.code !== 'string' || block.code.trim().length === 0) {
        fail(`${blockLabel} has an empty code block.`);
      }

      continue;
    }

    if (block._type === 'image') {
      const url = block.asset?.url;

      if (typeof url !== 'string' || !url.startsWith('/cms/')) {
        fail(`${blockLabel} image must reference a local CMS file.`);
      } else {
        collectMedia({ label: blockLabel, mediaPath: url });
      }

      continue;
    }

    if (!Array.isArray(block.children) || block.children.length === 0) {
      fail(`${blockLabel} has no spans.`);
      continue;
    }

    const markDefinitions = new Set((block.markDefs ?? []).map((mark) => mark._key));

    for (const span of block.children) {
      if (!spanTypes.has(span?._type)) {
        fail(`${blockLabel} has an unsupported span type.`);
      }

      for (const mark of span.marks ?? []) {
        if (!knownMarks.has(mark) && !markDefinitions.has(mark)) {
          fail(`${blockLabel} references an undefined mark: ${mark}`);
        }
      }
    }
  }
};

const validateExperienceDates = ({ experience, label }) => {
  if (!calendarMonthPattern.test(experience.startDate ?? '')) {
    fail(`${label} start date must be a YYYY-MM calendar month.`);
  }

  if (experience.endDate !== undefined) {
    if (!calendarMonthPattern.test(experience.endDate)) {
      fail(`${label} end date must be a YYYY-MM calendar month.`);
    } else if (experience.endDate < experience.startDate) {
      fail(`${label} ends before it starts.`);
    }
  }
};

const validatePost = ({ locale, post, label }) => {
  if (typeof post.title !== 'string' || post.title.length === 0) {
    fail(`${label} is missing a title.`);
  }

  if (typeof post.excerpt !== 'string' || post.excerpt.length === 0) {
    fail(`${label} is missing an excerpt.`);
  }

  validatePortableText({ blocks: post.bodyPortableText, label: `${label} body` });
  validateImage({ image: post.image, label: `${label} cover`, required: true });

  if (Number.isNaN(Date.parse(post.publishedAt))) {
    fail(`${label} has an invalid publication date.`);
  }

  if (!Number.isFinite(post.readingTimeMinutes) || post.readingTimeMinutes <= 0) {
    fail(`${label} must have a positive reading time.`);
  }

  if (post.language !== locale) {
    fail(`${label} is labelled "${post.language}" inside the "${locale}" content.`);
  }

  if (!Array.isArray(post.tags) || post.tags.length === 0) {
    fail(`${label} must have at least one tag.`);
  }
};

const { defaultLocale, locales } = content;

if (!Array.isArray(locales) || locales.length === 0) {
  fail('The snapshot must declare its locales.');
}

if (!defaultLocale || !locales?.includes(defaultLocale)) {
  fail('The snapshot default locale must be one of its locales.');
}

for (const locale of locales ?? []) {
  const localeContent = content.content?.[locale];
  const prefix = `[${locale}]`;

  if (!localeContent) {
    fail(`${prefix} content is missing from the snapshot.`);
    continue;
  }

  validateImage({
    image: localeContent.profile?.profileImage,
    label: `${prefix} profile`,
    required: false,
  });

  if (typeof localeContent.profile?.profileImg !== 'string') {
    fail(`${prefix} profile must reference a local CMS image.`);
  } else {
    collectMedia({ label: `${prefix} profile`, mediaPath: localeContent.profile.profileImg });
  }

  for (const [index, experience] of (localeContent.experiences ?? []).entries()) {
    validateExperienceDates({
      experience,
      label: `${prefix} experience "${experience.company ?? index}"`,
    });
  }

  const slugs = new Set();

  for (const [index, post] of (localeContent.posts ?? []).entries()) {
    const label = `${prefix} post "${post.slug || index}"`;

    if (typeof post.slug !== 'string' || post.slug.length === 0) {
      fail(`${prefix} post at index ${index} is missing a slug.`);
    } else if (slugs.has(post.slug)) {
      fail(`${prefix} has a duplicate post slug: ${post.slug}`);
    } else {
      slugs.add(post.slug);
    }

    validatePost({ label, locale, post });
  }
}

for (const filename of referencedMedia) {
  try {
    await access(path.resolve(publicDirectory, 'cms', filename));
  } catch {
    fail(`Missing exported media file: /cms/${filename}`);
  }
}

const postCount = (locales ?? []).reduce(
  (total, locale) => total + (content.content?.[locale]?.posts?.length ?? 0),
  0,
);

if (postCount === 0) {
  fail('The exported content snapshot must contain at least one published blog post.');
}

if (errors.length > 0) {
  for (const error of errors) {
    process.stderr.write(`- ${error}\n`);
  }

  process.exitCode = 1;
} else {
  process.stdout.write(
    `Validated ${locales.length} locales, ${postCount} published posts and ${referencedMedia.size} CMS media references.\n`,
  );
}
