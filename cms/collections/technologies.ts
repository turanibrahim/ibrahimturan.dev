import type { CollectionConfig } from 'payload';

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  access: {
    create: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    defaultColumns: ['name', 'category', 'level', '_status'],
    useAsTitle: 'name',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'key',
      type: 'text',
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: ['frontend', 'mobile', 'backend', 'tooling'],
      required: true,
    },
    {
      name: 'years',
      type: 'number',
    },
    {
      name: 'level',
      type: 'select',
      options: ['primary', 'working', 'familiar'],
      required: true,
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
