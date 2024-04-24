import type { RouteLocationNormalized } from 'vue-router'

/** 免登录白名单（匹配路由 path） */
const whiteListByPath: string[] = ['/register', '/login']

/** 免登录白名单（匹配路由 name） */
const whiteListByName: string[] = []

/** 判断路由是否在白名单 */
function isWhiteList(to: RouteLocationNormalized): boolean {
  // path 和 name 任意一个匹配上即可
  return whiteListByPath.includes(to.path) || whiteListByName.includes(to.name as string)
}

export default isWhiteList
