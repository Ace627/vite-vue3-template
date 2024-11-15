import type { App } from 'vue'
import { AppConfig } from '@/config'
import { constantRoutes } from './constants-routes'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { globalRouterAfterGuard, globalRouterBeforeGuard } from '@/config/permission'

/** 创建路由实例 */
const router = createRouter({
  history: AppConfig.IS_HASH_ROUTER ? createWebHashHistory(AppConfig.PUBLIC_PAHT) : createWebHistory(AppConfig.PUBLIC_PAHT),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

/** 路由配置函数 */
export async function setupRouter(app: App) {
  router.beforeEach(globalRouterBeforeGuard) // 配置路由全局前置守卫
  router.afterEach(globalRouterAfterGuard) // 配置路由全局后置守卫
  app.use(router)
  await router.isReady() // 当路由准备好时再执行挂载 https://router.vuejs.org/zh/api/interfaces/Router.html#Methods-isReady
}

export default router
