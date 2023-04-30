import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = []

export default createRouter({
  // history: createWebHistory(), // 路径中无 # 号，但需要服务器提供支持
  history: createWebHashHistory(),
  routes,
})
