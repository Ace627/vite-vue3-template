import type { App } from 'vue'
import Layout from '@/layout/index.vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

/** 创建路由实例 */
export const router = createRouter({
  history: import.meta.env.VITE_ROUTER_MODE === 'hash' ? createWebHashHistory() : createWebHistory(),
  routes: [
    {
      path: '',
      component: Layout,
    },
  ],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/** 路由配置函数 */
export async function setupRouter(app: App) {
  // 注册挂载路由插件
  app.use(router)

  // 当路由准备好时再执行挂载 https://router.vuejs.org/zh/api/interfaces/Router.html#Methods-isReady
  await router.isReady()
}
