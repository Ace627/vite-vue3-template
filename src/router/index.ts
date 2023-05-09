import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

/* Base Layout */
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
  },
]

export default createRouter({
  // history: createWebHistory(), // 路径中无 # 号，但需要服务器提供支持
  history: createWebHashHistory(),
  routes,
})
