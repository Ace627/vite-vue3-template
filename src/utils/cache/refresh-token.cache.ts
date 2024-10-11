import { CacheKey } from '@/config'

const refreshToken = useStorage<string>(CacheKey.REFRESH_TOKEN, null)

/** 存储登录刷新凭证到本地 */
export function setRefreshToken(token: string): void {
  refreshToken.value = token
}

/** 从本地获取存储的登录刷新凭证 */
export function getRefreshToken(): string {
  return refreshToken.value
}

/** 从本地移除存储的登录刷新凭证 */
export function removeRefreshToken(): void {
  refreshToken.value = null
}
