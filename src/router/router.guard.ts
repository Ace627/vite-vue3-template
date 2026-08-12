import { getAccessToken } from '@/utils'
import type { RouteLocationNormalized } from 'vue-router'

const whiteList = ['/login'] // 白名单路由：无需登录即可访问

export async function globalRouterBeforeGuard(to: RouteLocationNormalized) {
  // 如果在免登录的白名单中，直接放行
  if (whiteList.includes(to.path)) return true

  const userStore = useUserStore()
  const accessToken = getAccessToken()

  // 已登录但要进入登录页 → 重定向到主页（把「已登录访问登录页」的逻辑提到最前面（避免被白名单拦截））
  if (accessToken && to.path.toLowerCase() === '/login') return { path: '/', replace: true }

  // 无 Token + 不在白名单 → 重定向到登录页（携带回跳地址）
  if (!accessToken) return { path: '/login', query: { redirect: to.fullPath } }

  try {
    // 已有角色权限，直接放行
    if (userStore.roles && userStore.roles.length > 0) return
    // 未获取用户信息 → 拉取信息并生成动态路由
    await userStore.getInfo()
    // 动态路由添加后，重新导航到目标路由（replace: true 避免历史记录）
    return { ...to, replace: true }
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error)
    console.error('路由守卫异常: ', errMessage)
    await userStore.logout()
    return { path: '/login', query: { redirect: to.fullPath }, replace: true }
  }
}

export async function globalRouterAfterGuard() {
  // 测试
}
