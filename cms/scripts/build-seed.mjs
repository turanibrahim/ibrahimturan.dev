import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { markdownToPortableText } from 'emdash/client';
import {
  EXPERIENCES_COLLECTION,
  POSTS_COLLECTION,
  PROFILE_COLLECTION,
  PROJECTS_COLLECTION,
  TECHNOLOGIES_COLLECTION,
  collections,
  slugify,
  toMediaValue,
} from './content-model.mjs';

const cmsDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectDirectory = path.resolve(cmsDirectory, '..');
const snapshotPath = path.resolve(projectDirectory, 'src/data/cms-content.json');
const seedPath = path.resolve(cmsDirectory, 'seed/seed.json');
const thematicBreakPattern = /^(?:-{3,}|\*{3,}|_{3,})$/;

const snapshot = JSON.parse(await readFile(snapshotPath, 'utf8'));

const toImageBlock = (block) => {
  if (block._type !== 'image') {
    return null;
  }

  const { url } = block.asset ?? {};

  if (typeof url !== 'string' || !url.startsWith('/cms/')) {
    throw new Error(`Post image must live under /cms/: ${String(url)}`);
  }

  const filename = decodeURIComponent(url.slice('/cms/'.length));

  return {
    ...block,
    asset: toMediaValue({ url, alt: block.alt ?? '', filename }),
  };
};

const toBody = (markdown) =>
  markdownToPortableText(markdown)
    .flatMap((block) => {
      const isThematicBreak =
        block._type === 'block' &&
        block.children?.length === 1 &&
        thematicBreakPattern.test(block.children[0].text?.trim() ?? '');

      return isThematicBreak ? [] : [block];
    })
    .map((block) => toImageBlock(block) ?? block);

const profile = snapshot.profile;

const profileEntry = {
  id: 'profile',
  status: 'published',
  locale: 'en',
  data: {
    name: profile.name,
    surname: profile.surname,
    title: profile.title,
    tagline: profile.tagline ?? '',
    company: profile.company,
    company_logo: profile.companyLogo || undefined,
    company_url: profile.companyUrl || undefined,
    introduction: profile.introduction,
    email: profile.email,
    github: profile.github,
    linkedin: profile.linkedin,
    twitter: profile.twitter,
    devto: profile.devto,
    location: profile.location,
    profile_image: toMediaValue({ url: profile.profileImg, alt: `${profile.name} ${profile.surname}` }),
    education_university: profile.education.university,
    education_department: profile.education.department,
    education_start_year: profile.education.startYear,
    education_end_year: profile.education.endYear,
    education_location: profile.education.location,
  },
};

const experienceEntries = snapshot.experiences.map((experience, index) => ({
  id: `experience-${slugify(experience.company)}`,
  status: 'published',
  locale: 'en',
  data: {
    title: experience.title,
    company: experience.company,
    start_date: experience.startDate.slice(0, 7),
    end_date: experience.endDate?.slice(0, 7),
    summary: experience.summary,
    company_logo: experience.companyLogo,
    company_url: experience.companyUrl || undefined,
    location: experience.location,
    tech: experience.tech.map((name) => ({ name })),
    order: index + 1,
  },
}));

const projectEntries = snapshot.projects.map((project, index) => ({
  id: `project-${slugify(project.name)}`,
  status: 'published',
  locale: 'en',
  data: {
    name: project.name,
    engagement: project.engagement,
    ownership: project.ownership,
    summary: project.summary,
    contributions: project.contributions.map((text) => ({ text })),
    stack: project.stack.map((name) => ({ name })),
    links: project.links.map(({ label, url }) => ({ label, url })),
    order: index + 1,
  },
}));

const technologyEntries = snapshot.technologies.map((technology, index) => ({
  id: `technology-${technology.id}`,
  status: 'published',
  locale: 'en',
  data: {
    key: technology.id,
    name: technology.name,
    icon: technology.icon || undefined,
    category: technology.category,
    years: technology.years ?? undefined,
    level: technology.level,
    order: index + 1,
  },
}));

const postEntries = snapshot.posts.map((post, index) => ({
  id: `post-${post.slug}`,
  slug: post.slug,
  status: 'published',
  locale: 'en',
  data: {
    title: post.title,
    excerpt: post.excerpt,
    body: toBody(post.bodyMarkdown),
    published_on: post.publishedAt,
    reading_time: post.readingTimeMinutes,
    tags: post.tags.map((name) => ({ name })),
    cover: toMediaValue({ url: post.image.url, alt: post.image.alt }),
    source_url: post.sourceUrl || undefined,
    order: index + 1,
  },
}));

const seed = {
  $schema: 'https://emdashcms.com/seed.schema.json',
  version: '1',
  defaultLocale: 'en',
  meta: {
    name: 'ibrahimturan.dev',
    description: 'Portfolio content for ibrahimturan.dev',
  },
  settings: {
    title: 'İbrahim Turan',
    tagline: 'Full-stack engineer building thoughtful web products.',
    url: 'https://ibrahimturan.dev',
    timezone: 'Europe/Istanbul',
  },
  collections,
  content: {
    [PROFILE_COLLECTION]: [profileEntry],
    [EXPERIENCES_COLLECTION]: experienceEntries,
    [PROJECTS_COLLECTION]: projectEntries,
    [TECHNOLOGIES_COLLECTION]: technologyEntries,
    [POSTS_COLLECTION]: postEntries,
  },
};

await mkdir(path.dirname(seedPath), { recursive: true });
await writeFile(seedPath, `${JSON.stringify(seed, null, 2)}\n`, 'utf8');

process.stdout.write(
  `Wrote ${path.relative(projectDirectory, seedPath)} with ${experienceEntries.length} experiences, ${projectEntries.length} projects, ${technologyEntries.length} technologies, and ${postEntries.length} posts.\n`,
);
