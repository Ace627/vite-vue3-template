import { createRouter, createWebHashHistory, createMemoryHistory } from 'vue-router'
import { constantRoutes } from './constants-routes'

const { VITE_PUBLIC_PATH } = useEnv()

const router = createRouter({
  history: createWebHashHistory(VITE_PUBLIC_PATH),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
