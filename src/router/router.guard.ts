import { getAccessToken } from '@/utils'
import type { RouteLocationNormalized } from 'vue-router'

const whiteList = ['/login'] // 白名单路由：无需登录即可访问

export function globalRouterBeforeGuard(to: RouteLocationNormalized) {
  // 1. 白名单直接放行
  if (whiteList.includes(to.path)) {
    return true
  }

  // 2. 不在白名单且没有 accessToken：重定向登录页，携带当前路径用于登录后回跳
  const accessToken = getAccessToken()
  if (!accessToken) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }

  // 3. 已登录：正常放行
  return true
}
