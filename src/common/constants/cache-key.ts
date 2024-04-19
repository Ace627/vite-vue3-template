/** 缓存键的前缀 */
const CACHE_PREFIX = `v3-app`

/** 缓存数据时用到的 Key */
export class CacheKey {
  static readonly TOKEN = `${CACHE_PREFIX}_TOKEN_KEY`
  static readonly SIDEBAR_STATUS = `${CACHE_PREFIX}_SIDEBAR_STATUS_KEY`
  static readonly PROJECT_CONFIG = `${CACHE_PREFIX}_PROJECT_CONFIG_KEY`
}
