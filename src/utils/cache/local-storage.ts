/** 统一处理 localStorage */
import { CacheKey, WebStorage } from '@/common'
import { ProjectConfig } from '@/config/default-settings'

/* -------------------------------------------------------------------------- */
/*                                    Token                                   */
/* -------------------------------------------------------------------------- */
export const setAccessToken = (token: string) => WebStorage.setItem(CacheKey.ACCESS_TOKEN, token)
export const getAccessToken = (): string => WebStorage.getItem(CacheKey.ACCESS_TOKEN) || ''
export const removeAccessToken = () => WebStorage.removeItem(CacheKey.ACCESS_TOKEN)

/* -------------------------------------------------------------------------- */
/*                               Sidebar Status                               */
/* -------------------------------------------------------------------------- */
export const setSidebarStatus = (status: boolean) => WebStorage.setItem(CacheKey.SIDEBAR_STATUS, status)
export const getSidebarStatus = (): boolean => WebStorage.getItem(CacheKey.SIDEBAR_STATUS) ?? true

/* -------------------------------------------------------------------------- */
/*                               Project Config                               */
/* -------------------------------------------------------------------------- */
export const setProjectConfig = (config: Omit<ProjectConfig, 'showSetting'>) => WebStorage.setItem(CacheKey.PROJECT_CONFIG, config)
export const getProjectConfig = (): ProjectConfig => WebStorage.getItem(CacheKey.PROJECT_CONFIG) || ({} as ProjectConfig)
export const removeProjectConfig = () => WebStorage.removeItem(CacheKey.PROJECT_CONFIG)
