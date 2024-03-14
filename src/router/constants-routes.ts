import { Layout } from '@/config/constants'
import type { RouteRecordRaw } from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/ArAnimation',
    children: [
      {
        path: 'ArAnimation',
        name: 'ArAnimation',
        component: () => import('@/views/Demo/ArAnimation.vue'),
      },
      {
        path: 'JdNavbar',
        name: 'JdNavbar',
        component: () => import('@/views/Demo/JdNavbar.vue'),
      },
    ],
  },

  {
    path: '/demo',
    name: 'Demo',
    component: Layout,
  },

  {
    path: '/404',
    component: () => import('@/views/ExceptionPage/NotFound.vue'),
    props: { type: '404' },
    meta: { hidden: true },
    alias: '/:pathMatch(.*)*',
  },
]
