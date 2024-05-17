/** 统一处理 localStorage */
import { WebStorage } from '@/common'
import { CacheKey } from '@/config/constants/cache-key'
import { ProjectConfig } from '@/config/defaultSettings'

/* -------------------------------------------------------------------------- */
/*                                    Token                                   */
/* -------------------------------------------------------------------------- */
export const setToken = (token: string) => WebStorage.setItem(CacheKey.TOKEN, token)
export const getToken = (): string => WebStorage.getItem(CacheKey.TOKEN) || ''
export const removeToken = () => WebStorage.removeItem(CacheKey.TOKEN)

/* -------------------------------------------------------------------------- */
/*                               Sidebar Status                               */
/* -------------------------------------------------------------------------- */
export const setSidebarStatus = (status: boolean) => WebStorage.setItem(CacheKey.SIDEBAR_STATUS, status)
export const getSidebarStatus = (): boolean => WebStorage.getItem(CacheKey.SIDEBAR_STATUS) || true

/* -------------------------------------------------------------------------- */
/*                               Project Config                               */
/* -------------------------------------------------------------------------- */
export const setProjectConfig = (config: Omit<ProjectConfig, 'showSetting'>) => WebStorage.setItem(CacheKey.PROJECT_CONFIG, config)
export const getProjectConfig = (): ProjectConfig => WebStorage.getItem(CacheKey.PROJECT_CONFIG) || ({} as ProjectConfig)
export const removeProjectConfig = () => WebStorage.removeItem(CacheKey.PROJECT_CONFIG)
