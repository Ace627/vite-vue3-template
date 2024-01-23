import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { constantRoutes } from './constants-routes'

const { VITE_PUBLIC_PATH, VITE_ROUTER_MODE } = useEnv() // 解构环境变量

const router = createRouter({
  history: VITE_ROUTER_MODE === 'hash' ? createWebHashHistory(VITE_PUBLIC_PATH) : createWebHistory(VITE_PUBLIC_PATH),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
