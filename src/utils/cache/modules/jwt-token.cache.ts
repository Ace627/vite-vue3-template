import { CacheKey } from '../cache.constant'
import { CacheService } from '../cache.service'

/** 存储登录凭证到本地 */
export function setAccessToken(token: string): void {
  CacheService.local.set(CacheKey.ACCESS_TOKEN, token)
}

/** 从本地获取存储的登录凭证 */
export function getAccessToken(): string | null {
  return CacheService.local.get(CacheKey.ACCESS_TOKEN)
}

/** 从本地移除存储的登录凭证 */
export function removeAccessToken(): void {
  CacheService.local.remove(CacheKey.ACCESS_TOKEN)
}

/** 存储登录刷新凭证到本地 */
export function setRefreshToken(token: string): void {
  CacheService.local.set(CacheKey.REFRESH_TOKEN, token)
}

/** 从本地获取存储的登录刷新凭证 */
export function getRefreshToken(): string | null {
  return CacheService.local.get(CacheKey.REFRESH_TOKEN)
}

/** 从本地移除存储的登录刷新凭证 */
export function removeRefreshToken(): void {
  CacheService.local.remove(CacheKey.REFRESH_TOKEN)
}
