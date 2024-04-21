import type { App } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { constantRoutes } from './constants-routes'
import { globalRouterAfterGuard, globalRouterBeforeGuard } from '@/config/permission'

const { VITE_PUBLIC_PATH, VITE_ROUTER_MODE } = useEnv() // 解构环境变量

/** 创建路由实例 */
const router = createRouter({
  history: VITE_ROUTER_MODE === 'hash' ? createWebHashHistory(VITE_PUBLIC_PATH) : createWebHistory(VITE_PUBLIC_PATH),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/** 路由配置函数 */
export async function setupRouter(app: App) {
  router.beforeEach(globalRouterBeforeGuard) // 配置路由全局前置守卫
  router.afterEach(globalRouterAfterGuard) // 配置路由全局后置守卫
  app.use(router)
  await router.isReady() // 当路由准备好时再执行挂载 https://router.vuejs.org/zh/api/interfaces/Router.html#Methods-isReady
}

export default router
