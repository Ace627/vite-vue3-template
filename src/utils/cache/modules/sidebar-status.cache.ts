import { CacheKey } from '../cache.constant'
import { CacheService } from '../cache.service'

/**
 * 存储侧边栏折叠状态到本地
 * @param value - 侧边栏是否折叠的状态（true 表示折叠，false 表示展开）
 */
export function setSidebarStatus(value: boolean): void {
  CacheService.local.set(CacheKey.SIDEBAR_STATUS, value ? '1' : '0')
}

/**
 * 从本地缓存获取侧边栏的折叠状态。如果缓存数据存在，以其为主；否则，默认返回展开状态（false）
 * @returns {boolean} - 返回侧边栏的状态，true 表示折叠，false 表示展开
 */
export function getSidebarStatus(): boolean {
  const record = CacheService.local.get(CacheKey.SIDEBAR_STATUS)
  return record ? record === '1' : false // 如果获取到记录并且记录是 '1'，则返回折叠状态，否则返回展开状态（默认）
}

/**
 * 从本地移除存储的侧边栏折叠状态
 */
export function removeSidebarStatus(): void {
  CacheService.local.remove(CacheKey.SIDEBAR_STATUS)
}
