import { createRouter, createWebHashHistory, createMemoryHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

const constantRoutes: RouteRecordRaw[] = [
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

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
