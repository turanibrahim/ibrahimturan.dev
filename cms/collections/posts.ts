import type { CollectionConfig } from 'payload';

const remoteMarkdownImagePattern = /!\[[^\]]*\]\(https?:\/\//i;

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    defaultColumns: ['title', 'publishedAt', '_status'],
    useAsTitle: 'title',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'bodyMarkdown',
      type: 'textarea',
      admin: {
        description:
          'Upload inline images to Media, then reference them with a local path such as ![Description](/cms/filename.png).',
      },
      required: true,
      validate: (value) => {
        if (typeof value === 'string' && remoteMarkdownImagePattern.test(value)) {
          return 'Post images must be uploaded to Media and referenced with a local /cms/ path.';
        }

        return true;
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
    },
    {
      name: 'readingTimeMinutes',
      type: 'number',
      required: true,
    },
    {
      name: 'language',
      type: 'text',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload or select the post cover from the CMS media library.',
      },
    },
    {
      name: 'sourceUrl',
      type: 'text',
    },
    {
      name: 'order',
      type: 'number',
      index: true,
      required: true,
    },
  ],
  versions: {
    drafts: true,
  },
};
