import pkg from '../../../package.json'

/** 缓存键的前缀 */
const CACHE_PREFIX = pkg.name.toUpperCase()

export class CacheKey {
  /** 用户资源服务器访问凭证 */
  static readonly ACCESS_TOKEN = `${CACHE_PREFIX}-ACCESS-TOKEN`

  /** 资源凭证的刷新凭证 */
  static readonly REFRESH_TOKEN = `${CACHE_PREFIX}-REFRESH-TOKEN`

  /** 侧边栏伸缩状态 */
  static readonly SIDEBAR_STATUS = `${CACHE_PREFIX}-SIDEBAR-STATUS`

  /** 记住登录账号密码 */
  static readonly REMEMBER_PASSWORD = `${CACHE_PREFIX}-REMEMBER_PASSWORD`
}
