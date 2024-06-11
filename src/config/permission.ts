import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { getAccessToken } from '@/utils/cache/local-storage' // 从缓存读取 Token 的方法
import isWhiteList from '@/config/white-list' // 路由是否在白名单的判断判断方法

const { VITE_ROUTER_NPROGRESS } = useEnv()
const NProgress = useNProgress({ show: VITE_ROUTER_NPROGRESS }) // 顶部进度条

/**
 * @description 路由全局前置守卫
 */
export async function globalRouterBeforeGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  NProgress.start()
  const hasToken = getAccessToken()

  /** 如果没有 Token，但在免登录的白名单中，则直接进入；否则将被重定向到登录页面 */
  if (!hasToken) return isWhiteList(to) ? next() : next(`/login?redirect=${to.fullPath}`)

  /** 如果已经登录，并准备进入 Login 页面，则重定向到主页 */
  if (to.path.toLowerCase() === '/login') return next({ path: '/', replace: true })

  /** 其余情况暂时放行 */
  next()
}

/**
 * @description 路由全局后置守卫
 */
export async function globalRouterAfterGuard(to: RouteLocationNormalized) {
  NProgress.done()
}
