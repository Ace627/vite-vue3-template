import pkg from '../../package.json'

/** 缓存键的前缀 */
const CACHE_PREFIX = pkg.name.toUpperCase()

/** 缓存数据时用到的 Key */
export class CacheKey {
  static readonly ACCESS_TOKEN = `${CACHE_PREFIX}-ACCESS-TOKEN`
  static readonly SIDEBAR_STATUS = `${CACHE_PREFIX}-SIDEBAR-STATUS`
  static readonly PROJECT_CONFIG = `${CACHE_PREFIX}-PROJECT-CONFIG`
}
