import { CacheKey } from '@/config'

const sidebarStatus = useStorage<boolean>(CacheKey.SIDEBAR_STATUS, true)

/** 存储侧栏展开状态到本地 */
export function setSidebarStatus(status: boolean): void {
  sidebarStatus.value = status
}

/** 从本地获取侧栏展开状态 */
export function getSidebarStatus(): boolean {
  return sidebarStatus.value
}

/** 从本地移除侧栏展开状态 */
export function removeSidebarStatus(): void {
  sidebarStatus.value = null
}
