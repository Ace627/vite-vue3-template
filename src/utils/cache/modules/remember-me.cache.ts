import { CacheKey } from '../cache.constant' // 导入缓存的键名定义
import { CacheService } from '../cache.service' // 导入缓存服务

/**
 * 设置登录信息（如用户名、密码、记住我等）
 * @param value - 用户的登录信息对象
 */
export function setLoginInfo(value: RememberLoginDto) {
  CacheService.local.setJSON(CacheKey.REMEMBER_PASSWORD, value)
}

/**
 * 获取存储的登录信息
 * @returns {RememberLoginDto} - 返回存储的登录信息，若没有存储返回空对象
 */
export function getLoginInfo(): RememberLoginDto {
  return CacheService.local.getJSON(CacheKey.REMEMBER_PASSWORD) ?? {}
}

/**
 * 移除存储的登录信息
 */
export function removeLoginInfo(): void {
  CacheService.local.remove(CacheKey.REMEMBER_PASSWORD)
}
