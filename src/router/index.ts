import type { App } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { STATIC_ROUTE_LIST } from './modules/static.route'
import { globalRouterBeforeGuard } from './router.guard'

/** 创建路由实例 */
export const router = createRouter({
  history: import.meta.env.VITE_ROUTER_MODE === 'hash' ? createWebHashHistory() : createWebHistory(),
  routes: STATIC_ROUTE_LIST,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/** 路由配置函数 */
export async function setupRouter(app: App) {
  // 配置路由全局前置守卫
  router.beforeEach(globalRouterBeforeGuard)

  // 注册挂载路由插件
  app.use(router)

  // 当路由准备好时再执行挂载 https://router.vuejs.org/zh/api/interfaces/Router.html#Methods-isReady
  await router.isReady()
}
