import type { GlobalConfig } from 'payload';

export const Profile: GlobalConfig = {
  slug: 'profile',
  access: {
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'surname',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      type: 'textarea',
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'companyLogo',
      type: 'text',
    },
    {
      name: 'companyUrl',
      type: 'text',
    },
    {
      name: 'introduction',
      type: 'textarea',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'profileImg',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'github',
      type: 'text',
      required: true,
    },
    {
      name: 'linkedin',
      type: 'text',
      required: true,
    },
    {
      name: 'twitter',
      type: 'text',
      required: true,
    },
    {
      name: 'devto',
      type: 'text',
      required: true,
    },
    {
      name: 'education',
      type: 'group',
      fields: [
        {
          name: 'university',
          type: 'text',
          required: true,
        },
        {
          name: 'department',
          type: 'text',
          required: true,
        },
        {
          name: 'startYear',
          type: 'text',
          required: true,
        },
        {
          name: 'endYear',
          type: 'text',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
};
