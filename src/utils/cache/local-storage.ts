/** 统一处理 localStorage */
import { CacheKey } from '@/common/constants/cache-key'

/* -------------------------------------------------------------------------- */
/*                                    Token                                   */
/* -------------------------------------------------------------------------- */
export function getToken(): string {
  return localStorage.getItem(CacheKey.TOKEN) || ''
}
export function setToken(token: string): void {
  localStorage.setItem(CacheKey.TOKEN, token)
}
export function removeToken(): void {
  localStorage.removeItem(CacheKey.TOKEN)
}
