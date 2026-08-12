import { isBoolean } from '../validate'
import { StorageCache } from '../storage-cache.util'

/** 设置侧边栏状态 */
export function setSidebarStatus(value: boolean): void {
  StorageCache.set('sidebarStatus', value)
}

/** 获取侧边栏状态 */
export function getSidebarStatus(defaultValue = false): boolean {
  const value = StorageCache.get<boolean>('sidebarStatus')
  return isBoolean(value) ? value : defaultValue
}

/** 移除侧边栏状态 */
export function removeSidebarStatus(): void {
  StorageCache.remove('sidebarStatus')
}
