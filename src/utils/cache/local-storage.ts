/** 统一处理 localStorage */
import { CacheKey } from '@/common/constants/cache-key'
import { ProjectConfig } from '@/config/defaultSettings'

/* -------------------------------------------------------------------------- */
/*                                    Token                                   */
/* -------------------------------------------------------------------------- */
export function setToken(token: string): void {
  localStorage.setItem(CacheKey.TOKEN, token)
}
export function getToken(): string {
  return localStorage.getItem(CacheKey.TOKEN) || ''
}
export function removeToken(): void {
  localStorage.removeItem(CacheKey.TOKEN)
}

/* -------------------------------------------------------------------------- */
/*                               Sidebar Status                               */
/* -------------------------------------------------------------------------- */
export function setSidebarStatus(status: boolean): void {
  const data = { [CacheKey.SIDEBAR_STATUS]: status }
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, JSON.stringify(data))
}
export function getSidebarStatus(): boolean {
  const json = localStorage.getItem(CacheKey.SIDEBAR_STATUS)
  return json ? JSON.parse(json)[CacheKey.SIDEBAR_STATUS] : true
}

/* -------------------------------------------------------------------------- */
/*                               Project Config                               */
/* -------------------------------------------------------------------------- */
export function setProjectConfig(config: Omit<ProjectConfig, 'showSetting'>): void {
  localStorage.setItem(CacheKey.PROJECT_CONFIG, JSON.stringify(config))
}
export function getProjectConfig(): ProjectConfig {
  const json = localStorage.getItem(CacheKey.PROJECT_CONFIG)
  return json ? JSON.parse(json) : {}
}
export function removeProjectConfig() {
  localStorage.removeItem(CacheKey.PROJECT_CONFIG)
}
