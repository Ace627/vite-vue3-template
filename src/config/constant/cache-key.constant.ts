import pkg from '../../../package.json'

/** 缓存键的前缀 */
const CACHE_PREFIX = pkg.name.toUpperCase()

/** 缓存数据时用到的 Key */
export class CacheKey {
  /** 用户资源服务器访问凭证 */
  static readonly ACCESS_TOKEN = `${CACHE_PREFIX}-ACCESS-TOKEN`

  /** 资源凭证的刷新凭证 */
  static readonly REFRESH_TOKEN = `${CACHE_PREFIX}-REFRESH-TOKEN`

  /** 侧边栏伸缩状态 */
  static readonly SIDEBAR_STATUS = `${CACHE_PREFIX}-SIDEBAR-STATUS`

  /** 应用配置 */
  static readonly PROJECT_CONFIG = `${CACHE_PREFIX}-PROJECT-CONFIG`
}
