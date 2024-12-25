import { CacheKey } from '../cache.constant'
import { CacheService } from '../cache.service'

export function setLoginInfo(value: RememberLoginDto) {
  CacheService.local.setJSON(CacheKey.REMEMBER_PASSWORD, value)
}

export function getLoginInfo(): RememberLoginDto {
  return CacheService.local.getJSON(CacheKey.REMEMBER_PASSWORD) ?? {}
}

export function removeLoginInfo(): void {
  CacheService.local.remove(CacheKey.REMEMBER_PASSWORD)
}
