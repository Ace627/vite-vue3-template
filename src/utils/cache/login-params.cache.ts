import type { Auth } from '@/types'
import { StorageCache } from '../storage-cache.util'

/** 记住密码时缓存的登录参数 */
export type CachedLoginParams = Pick<Auth.LoginParams, 'username' | 'password'> & { rememberMe: boolean }

/** 缓存登录参数 */
export function setLoginParams(value: CachedLoginParams): void {
  StorageCache.set('loginParams', value)
}

/** 读取登录参数 */
export function getLoginParams(): Partial<CachedLoginParams> {
  return StorageCache.get('loginParams') ?? {}
}

/** 清除登录参数 */
export function removeLoginParams(): void {
  StorageCache.remove('loginParams')
}
