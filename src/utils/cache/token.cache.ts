/**
 * Token 持久化层（基于 StorageCache 的领域封装）
 *
 * 约定：
 * - token 的过期与有效性由服务端 Redis 负责，前端仅做「不透明持久化」，存字符串、请求时带出。
 * - 此处不设置客户端 TTL，token 在 localStorage 中一直保留，直到被主动清掉。
 * - 清场（登出 / 收到 401）由调用方负责，调用 removeAccessToken / removeRefreshToken。
 * - 存储 key 统一走 StorageCache 的 `app:storage:` 前缀，不会污染同源下的其它 localStorage 数据。
 */

import { StorageCache } from '../storage-cache.util'

/** 写入 accessToken（短时凭证，每次请求通过 Authorization 头携带） */
export function setAccessToken(token: string): boolean {
  return StorageCache.set('accessToken', token)
}

/** 读取 accessToken；未存储时返回 null */
export function getAccessToken(): string | null {
  return StorageCache.get<string>('accessToken')
}

/** 清除 accessToken（登出或收到 401 时调用） */
export function removeAccessToken(): void {
  return StorageCache.remove('accessToken')
}

/** 写入 refreshToken（长时凭证，用于向服务端换取新的 accessToken） */
export function setRefreshToken(refreshToken: string): boolean {
  return StorageCache.set('refreshToken', refreshToken)
}

/** 读取 refreshToken；未存储时返回 null */
export function getRefreshToken(): string | null {
  return StorageCache.get<string>('refreshToken')
}

/** 清除 refreshToken（登出或收到 401 时调用） */
export function removeRefreshToken(): void {
  StorageCache.remove('refreshToken')
}
