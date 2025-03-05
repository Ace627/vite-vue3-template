import router from '.'
import { getAccessToken } from '@/utils/cache' // 从缓存读取 Token 的方法
import { isWhiteList } from './router.helper'
import { HOME_PAGE_URL, LOGIN_PAGE_URL } from './router.constant'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

// 根据环境配置决定是否开启路由切换时的顶部进度条
const NProgress = useNProgress({ show: __RUNTIME_CONFIG__.VITE_ROUTER_NPROGRESS })

// 全局路由前置守卫
export async function globalRouterBeforeGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  NProgress.start()
  const accessToken = getAccessToken()

  // 如果没有 Token，但在免登录的白名单中，则直接进入；否则将被重定向到登录页面
  if (!accessToken) return isWhiteList(to) ? next() : next({ path: LOGIN_PAGE_URL, query: { redirect: to.fullPath } })

  // 如果已经登录，并准备进入 Login 页面，则重定向到主页
  if (to.path.toLowerCase() === LOGIN_PAGE_URL) return next({ path: HOME_PAGE_URL, replace: true })

  /** 其余情况暂时放行 */
  next()
}

// 路由全局后置守卫
export async function globalRouterAfterGuard(to: RouteLocationNormalized) {
  NProgress.done()
}
