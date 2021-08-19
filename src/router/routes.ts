import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    meta: {auth: true}
    children: [],
  },
  {
    path: '/',
    component: () => import('layouts/HeaderOnly.vue')
    children: [
      {path: 'login', component: () => import('pages/Login.vue')}
    ]
  }

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
