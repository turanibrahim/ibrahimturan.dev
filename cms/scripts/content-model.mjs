export const PROFILE_COLLECTION = 'profile';
export const EXPERIENCES_COLLECTION = 'experiences';
export const PROJECTS_COLLECTION = 'projects';
export const TECHNOLOGIES_COLLECTION = 'technologies';
export const POSTS_COLLECTION = 'posts';

const mediaUrlPattern = /^\/cms\/([^/?#]+)$/;

const techRepeater = {
  slug: 'tech',
  label: 'Tech',
  type: 'repeater',
  translatable: false,
  required: true,
  validation: {
    subFields: [{ slug: 'name', label: 'Name', type: 'string', required: true }],
  },
};

export const collections = [
  {
    slug: PROFILE_COLLECTION,
    label: 'Profile',
    labelSingular: 'Profile',
    supports: ['drafts', 'revisions'],
    routable: false,
    titleField: 'name',
    fields: [
      { slug: 'name', label: 'Name', type: 'string', translatable: false, required: true },
      { slug: 'surname', label: 'Surname', type: 'string', translatable: false, required: true },
      { slug: 'title', label: 'Title', type: 'string', required: true },
      { slug: 'tagline', label: 'Tagline', type: 'text' },
      { slug: 'company', label: 'Company', type: 'string', required: true },
      { slug: 'company_logo', label: 'Company logo', type: 'url', translatable: false },
      { slug: 'company_url', label: 'Company URL', type: 'url', translatable: false },
      { slug: 'introduction', label: 'Introduction', type: 'text', required: true },
      { slug: 'email', label: 'Email', type: 'string', translatable: false, required: true },
      { slug: 'github', label: 'GitHub', type: 'url', translatable: false },
      { slug: 'linkedin', label: 'LinkedIn', type: 'url', translatable: false },
      { slug: 'twitter', label: 'Twitter', type: 'url', translatable: false },
      { slug: 'devto', label: 'dev.to', type: 'url', translatable: false },
      { slug: 'location', label: 'Location', type: 'string', required: true },
      { slug: 'profile_image', label: 'Profile image', type: 'image', translatable: false },
      {
        slug: 'education_university',
        label: 'University',
        type: 'string',
        required: true,
      },
      {
        slug: 'education_department',
        label: 'Department',
        type: 'string',
        required: true,
      },
      {
        slug: 'education_start_year',
        label: 'Education start year',
        type: 'string',
        translatable: false,
        required: true,
      },
      {
        slug: 'education_end_year',
        label: 'Education end year',
        type: 'string',
        translatable: false,
        required: true,
      },
      { slug: 'education_location', label: 'Education location', type: 'string', required: true },
    ],
  },
  {
    slug: EXPERIENCES_COLLECTION,
    label: 'Experiences',
    labelSingular: 'Experience',
    supports: ['drafts', 'revisions'],
    routable: false,
    titleField: 'company',
    fields: [
      { slug: 'title', label: 'Title', type: 'string', required: true },
      { slug: 'company', label: 'Company', type: 'string', translatable: false, required: true },
      {
        slug: 'start_date',
        label: 'Start (YYYY-MM)',
        type: 'string',
        translatable: false,
        required: true,
        validation: { pattern: '^\\d{4}-\\d{2}$' },
      },
      {
        slug: 'end_date',
        label: 'End (YYYY-MM)',
        type: 'string',
        translatable: false,
        validation: { pattern: '^\\d{4}-\\d{2}$' },
      },
      { slug: 'summary', label: 'Summary', type: 'text', required: true },
      {
        slug: 'company_logo',
        label: 'Company logo URL',
        type: 'url',
        translatable: false,
        required: true,
      },
      { slug: 'company_url', label: 'Company URL', type: 'url', translatable: false },
      { slug: 'location', label: 'Location', type: 'string', required: true },
      techRepeater,
      { slug: 'order', label: 'Order', type: 'number', translatable: false, required: true },
    ],
  },
  {
    slug: PROJECTS_COLLECTION,
    label: 'Projects',
    labelSingular: 'Project',
    supports: ['drafts', 'revisions'],
    routable: false,
    titleField: 'name',
    fields: [
      { slug: 'name', label: 'Name', type: 'string', translatable: false, required: true },
      {
        slug: 'engagement',
        label: 'Engagement',
        type: 'select',
        translatable: false,
        required: true,
        validation: { options: ['Company', 'Internal', 'Freelance'] },
      },
      { slug: 'ownership', label: 'Ownership', type: 'string', required: true },
      { slug: 'summary', label: 'Summary', type: 'text', required: true },
      {
        slug: 'contributions',
        label: 'Contributions',
        type: 'repeater',
        required: true,
        validation: {
          subFields: [{ slug: 'text', label: 'Contribution', type: 'text', required: true }],
        },
      },
      {
        slug: 'stack',
        label: 'Stack',
        type: 'repeater',
        translatable: false,
        required: true,
        validation: {
          subFields: [{ slug: 'name', label: 'Name', type: 'string', required: true }],
        },
      },
      {
        slug: 'links',
        label: 'Links',
        type: 'repeater',
        validation: {
          subFields: [
            { slug: 'label', label: 'Label', type: 'string', required: true },
            { slug: 'url', label: 'URL', type: 'url', required: true },
          ],
        },
      },
      { slug: 'order', label: 'Order', type: 'number', translatable: false, required: true },
    ],
  },
  {
    slug: TECHNOLOGIES_COLLECTION,
    label: 'Technologies',
    labelSingular: 'Technology',
    supports: ['drafts', 'revisions'],
    routable: false,
    titleField: 'name',
    fields: [
      {
        slug: 'key',
        label: 'Key',
        type: 'string',
        translatable: false,
        required: true,
        unique: true,
      },
      { slug: 'name', label: 'Name', type: 'string', translatable: false, required: true },
      { slug: 'icon', label: 'Icon', type: 'string', translatable: false },
      {
        slug: 'category',
        label: 'Category',
        type: 'select',
        translatable: false,
        required: true,
        validation: { options: ['frontend', 'mobile', 'backend', 'tooling'] },
      },
      { slug: 'years', label: 'Years', type: 'integer', translatable: false },
      {
        slug: 'level',
        label: 'Level',
        type: 'select',
        translatable: false,
        required: true,
        validation: { options: ['primary', 'working', 'familiar'] },
      },
      { slug: 'order', label: 'Order', type: 'number', translatable: false, required: true },
    ],
  },
  {
    slug: POSTS_COLLECTION,
    label: 'Posts',
    labelSingular: 'Post',
    supports: ['drafts', 'revisions', 'seo'],
    urlPattern: '/blog/{slug}',
    titleField: 'title',
    dateField: 'published_on',
    fields: [
      { slug: 'title', label: 'Title', type: 'string', required: true },
      { slug: 'excerpt', label: 'Excerpt', type: 'text', required: true },
      {
        slug: 'language',
        label: 'Language',
        type: 'select',
        required: true,
        validation: { options: ['en', 'tr'] },
      },
      { slug: 'body', label: 'Body', type: 'portableText', required: true },
      {
        slug: 'published_on',
        label: 'Published on',
        type: 'datetime',
        translatable: false,
        required: true,
      },
      {
        slug: 'reading_time',
        label: 'Reading time (minutes)',
        type: 'integer',
        translatable: false,
        required: true,
      },
      {
        slug: 'tags',
        label: 'Tags',
        type: 'repeater',
        translatable: false,
        required: true,
        validation: {
          subFields: [{ slug: 'name', label: 'Name', type: 'string', required: true }],
        },
      },
      { slug: 'cover', label: 'Cover image', type: 'image', translatable: false, required: true },
      { slug: 'source_url', label: 'Source URL', type: 'url', translatable: false },
      { slug: 'order', label: 'Order', type: 'number', translatable: false, required: true },
    ],
  },
];

export const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const toMediaValue = ({ url, alt, filename }) => {
  const match = mediaUrlPattern.exec(url);

  if (!match) {
    throw new Error(`Media must live under /cms/: ${url}`);
  }

  return {
    $media: {
      url,
      filename: filename ?? decodeURIComponent(match[1]),
      alt,
    },
  };
};
