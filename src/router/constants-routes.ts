import type { RouteRecordRaw } from 'vue-router'
import { BaseLayout } from '@/layouts'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'BaseLayout',
    component: BaseLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: { title: '首页' },
      },
    ],
  },

  {
    path: '/404',
    component: () => import('@/views/ExceptionPage/NotFound.vue'),
    props: { type: '404' },
    meta: { hidden: true },
    alias: '/:pathMatch(.*)*',
  },
]
