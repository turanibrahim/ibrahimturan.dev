export default [
  {
    path: '/',
    name: 'Homepage',
    component: () => import('@/pages/home.page.vue'),
    meta: {
      layout: 'default',
    },
  },
  {
    path: '/colors',
    name: 'Colors',
    component: () => import('@/pages/colors.page.vue'),
    meta: {
      layout: 'default',
    },
  },
];
