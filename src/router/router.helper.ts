import { NAME_WHITE_LIST, PATH_WHITE_LIST } from './router.constant'
import type { RouteMeta, RouteRecordRaw, RouteLocationNormalized } from 'vue-router'

/**
 * 判断路由是否在白名单
 */
export function isWhiteList(to: RouteLocationNormalized): boolean {
  // path 和 name 任意一个匹配上即可
  return PATH_WHITE_LIST.includes(to.path) || NAME_WHITE_LIST.includes(to.name as string)
}
