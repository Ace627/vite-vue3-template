import { CacheKey } from '@/config'

const sidebarStatus = useStorage<boolean>(CacheKey.SIDEBAR_STATUS, true)

export const setSidebarStatus = (status: boolean) => (sidebarStatus.value = status)

export const getSidebarStatus = (): boolean => sidebarStatus.value

export const removeSidebarStatus = (): void => (sidebarStatus.value = undefined)
