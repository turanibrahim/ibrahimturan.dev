export default [
  {
    path: '/',
    name: 'Homepage',
    component: () => import('@/pages/home.page.vue'),
    meta: {
      layout: 'default',
    },
  },
];
