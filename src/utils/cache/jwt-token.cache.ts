import { CacheKey } from '@/config'

/** 存储登录凭证到本地 */
export function setAccessToken(token: string): void {
  localStorage.setItem(CacheKey.ACCESS_TOKEN, token)
}

/** 从本地获取存储的登录凭证 */
export function getAccessToken(): string | null {
  return localStorage.getItem(CacheKey.ACCESS_TOKEN)
}

/** 从本地移除存储的登录凭证 */
export function removeAccessToken(): void {
  localStorage.removeItem(CacheKey.ACCESS_TOKEN)
}

/** 存储登录刷新凭证到本地 */
export function setRefreshToken(token: string): void {
  localStorage.setItem(CacheKey.REFRESH_TOKEN, token)
}

/** 从本地获取存储的登录刷新凭证 */
export function getRefreshToken(): string | null {
  return localStorage.getItem(CacheKey.REFRESH_TOKEN)
}

/** 从本地移除存储的登录刷新凭证 */
export function removeRefreshToken(): void {
  localStorage.removeItem(CacheKey.REFRESH_TOKEN)
}
