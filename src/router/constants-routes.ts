import { Layout } from '@/config/constants'
import type { RouteRecordRaw } from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
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
