import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

/* Base Layout */
const Layout = () => import('@/layout/index.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
  },
]

// 设定当前路由的模式
const IS_HASH_MODE = import.meta.env.VITE_ROUTER_MODE === 'hash'
const RouterMode = IS_HASH_MODE ? createWebHashHistory() : createWebHistory()

export default createRouter({
  history: RouterMode,
  routes,
  // 刷新时，重置滚动条的位置
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
