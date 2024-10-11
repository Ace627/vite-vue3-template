import { CacheKey } from '@/config'

const accessToken = useStorage<string>(CacheKey.ACCESS_TOKEN, null)

/** 存储登录凭证到本地 */
export function setAccessToken(token: string): void {
  accessToken.value = token
}

/** 从本地获取存储的登录凭证 */
export function getAccessToken(): string {
  return accessToken.value
}

/** 从本地移除存储的登录凭证 */
export function removeAccessToken(): void {
  accessToken.value = null
}
