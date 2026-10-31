import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { markdownToPortableText } from 'emdash/client';

const cmsDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const seedPath = path.resolve(cmsDirectory, 'seed/seed.json');
const translationsDirectory = path.resolve(cmsDirectory, 'content/tr');
const postsDirectory = path.resolve(translationsDirectory, 'posts');
const outputSeedPath = path.resolve(cmsDirectory, '.emdash/seed.translations.json');

const normalizeApostrophes = (value) => value.replace(/(?<=\p{L}|\d)'(?=\p{L})/gu, '’');

const readJson = async (filePath) => JSON.parse(await readFile(filePath, 'utf8'));

const toBody = (markdown) =>
  markdownToPortableText(markdown).map((block) => {
    if (block._type !== 'image') {
      return block;
    }

    const { url } = block.asset ?? {};

    if (typeof url !== 'string' || !url.startsWith('/cms/')) {
      throw new Error(`Translated post image must live under /cms/: ${String(url)}`);
    }

    return {
      ...block,
      asset: {
        $media: {
          url,
          alt: block.alt ?? '',
          filename: decodeURIComponent(url.slice('/cms/'.length)),
        },
      },
    };
  });

const toDraft = ({ entry, data }) => ({
  ...entry,
  id: `${entry.id}-tr`,
  locale: 'tr',
  status: 'draft',
  translationOf: entry.id,
  data,
});

const seed = await readJson(seedPath);
const [profileTranslation, experienceTranslations, projectTranslations, postTranslations] =
  await Promise.all([
    readJson(path.resolve(translationsDirectory, 'profile.json')),
    readJson(path.resolve(translationsDirectory, 'experiences.json')),
    readJson(path.resolve(translationsDirectory, 'projects.json')),
    readJson(path.resolve(translationsDirectory, 'posts.json')),
  ]);

const [profileSource] = seed.content.profile;
const translatedProfile = toDraft({
  entry: profileSource,
  data: {
    ...profileSource.data,
    ...Object.fromEntries(
      Object.entries(profileTranslation).map(([key, value]) => [key, normalizeApostrophes(value)]),
    ),
  },
});

const translatedExperiences = seed.content.experiences.map((experience) => {
  const translation = experienceTranslations[experience.id];

  if (!translation) {
    throw new Error(`Missing Turkish translation for experience: ${experience.id}`);
  }

  return toDraft({
    entry: experience,
    data: {
      ...experience.data,
      title: normalizeApostrophes(translation.title),
      location: normalizeApostrophes(translation.location),
      summary: normalizeApostrophes(translation.summary),
    },
  });
});

const translatedProjects = seed.content.projects.map((project) => {
  const translation = projectTranslations[project.id];

  if (!translation) {
    throw new Error(`Missing Turkish translation for project: ${project.id}`);
  }

  const sourceLinks = project.data.links ?? [];
  const linkLabels = translation.linkLabels ?? [];

  if (linkLabels.length !== sourceLinks.length) {
    throw new Error(
      `Project ${project.id} has ${sourceLinks.length} links but ${linkLabels.length} translated labels.`,
    );
  }

  return toDraft({
    entry: project,
    data: {
      ...project.data,
      ownership: normalizeApostrophes(translation.ownership),
      summary: normalizeApostrophes(translation.summary),
      contributions: translation.contributions.map((text) => ({
        text: normalizeApostrophes(text),
      })),
      links: sourceLinks.map((link, index) => ({
        label: normalizeApostrophes(linkLabels[index]),
        url: link.url,
      })),
    },
  });
});

const translatedPosts = [];

for (const post of seed.content.posts) {
  const translation = postTranslations[post.slug];

  if (!translation) {
    continue;
  }

  const markdown = await readFile(path.resolve(postsDirectory, `${post.slug}.md`), 'utf8');

  translatedPosts.push(
    toDraft({
      entry: post,
      data: {
        ...post.data,
        title: normalizeApostrophes(translation.title),
        excerpt: normalizeApostrophes(translation.excerpt),
        body: toBody(markdown),
      },
    }),
  );
}

const translationsSeed = {
  ...seed,
  content: {
    ...seed.content,
    experiences: [...seed.content.experiences, ...translatedExperiences],
    posts: [...seed.content.posts, ...translatedPosts],
    profile: [...seed.content.profile, translatedProfile],
    projects: [...seed.content.projects, ...translatedProjects],
  },
};

await mkdir(path.dirname(outputSeedPath), { recursive: true });
await writeFile(outputSeedPath, `${JSON.stringify(translationsSeed, null, 2)}\n`, 'utf8');

process.stdout.write(
  `Built ${translatedExperiences.length} experience, ${translatedProjects.length} project and ${translatedPosts.length} post drafts in Turkish.\n`,
);

const child = spawn(
  process.execPath,
  [
    path.resolve(cmsDirectory, 'scripts/seed.mjs'),
    '--seed',
    outputSeedPath,
    '--on-conflict',
    'skip',
  ],
  { cwd: cmsDirectory, stdio: 'inherit' },
);

await new Promise((resolve, reject) => {
  child.on('error', reject);
  child.on('exit', (code) =>
    code === 0 ? resolve() : reject(new Error(`seed exited with code ${code}`)),
  );
});
