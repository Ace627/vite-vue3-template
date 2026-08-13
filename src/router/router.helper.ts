import { isExternal } from '@/utils'

export function normalizePath(path: string): string {
  return path ? path.replace(/\/+/g, '/').replace(/\/$/, '') : path
}

export function resolvePath(routePath: string, basePath: string): string {
  if (isExternal(routePath)) return routePath
  if (isExternal(basePath)) return basePath
  return normalizePath(basePath + '/' + routePath)
}
