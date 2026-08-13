import type { RouteRecordRaw } from 'vue-router'
import { STATIC_ROUTE_LIST } from '@/router/modules/static.route'

export const usePermissionStore = defineStore('permission', () => {
  /** 后端数据解析后的动态路由表 */
  const dynamicRouteList = shallowRef<RouteRecordRaw[]>([])

  /** 递归路由表 用于无限递归菜单 */
  const sidebarRoutes = shallowRef<RouteRecordRaw[]>([])

  /** 根据角色生成可访问的 Routes（可访问路由 = 常驻路由 + 有访问权限的动态路由） */
  async function getRoutes() {
    // const backRouteList = await AuthRequest.getRoutes()
    // dynamicRouteList.value = generateRoutes(backRouteList)
    // sidebarRoutes.value = [...STATIC_ROUTE_LIST, ...dynamicRouteList.value]
    sidebarRoutes.value = [...STATIC_ROUTE_LIST]
  }

  return { dynamicRouteList, sidebarRoutes, getRoutes }
})
