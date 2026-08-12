import type { App } from 'vue'
import { STATIC_ROUTE_LIST } from './modules/static.route'
import { globalRouterAfterGuard, globalRouterBeforeGuard } from './router.guard'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const { VITE_ROUTER_MODE, VITE_PUBLIC_PATH } = import.meta.env

/** 创建路由实例 */
export const router = createRouter({
  history: VITE_ROUTER_MODE === 'hash' ? createWebHashHistory(VITE_PUBLIC_PATH) : createWebHistory(VITE_PUBLIC_PATH),
  routes: STATIC_ROUTE_LIST,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/** 路由配置函数 */
export async function setupRouter(app: App) {
  // 配置路由全局前置守卫
  router.beforeEach(globalRouterBeforeGuard)

  // 配置路由全局后置守卫
  router.afterEach(globalRouterAfterGuard)

  // 注册挂载路由插件
  app.use(router)

  // 当路由准备好时再执行挂载 https://router.vuejs.org/zh/api/interfaces/Router.html#Methods-isReady
  await router.isReady()
}
