import { isStringNumber } from '@/utils/validate'

export class AppConfig {
  /** 登录页地址 默认 */
  static readonly LOGIN_PAGE_URL = '/login'

  /** 首页地址 默认 */
  static readonly HOME_PAGE_URL = '/dashboard'

  /** 404 页面地址 */
  static readonly NOT_FOUND_PAGE_URL = '/404'

  /** 自定义环境变量前缀 */
  static readonly ENV_PREFIX = 'VITE_'

  /** 凭证请求头的 Key */
  static readonly AUTHORIZATION = 'Authorization'

  /** Token 前缀字符 */
  static readonly TOKEN_PREFIX = 'Bearer'

  /** 当前是否处于开发环境 */
  static readonly IS_DEV = import.meta.env.DEV && import.meta.env.MODE === 'development'

  /** 当前是否处于开发环境 */
  static readonly IS_PROD = import.meta.env.PROD && import.meta.env.MODE === 'production'

  /** 部署应用包时的基本 URL */
  static readonly PUBLIC_PAHT = import.meta.env.VITE_PUBLIC_PATH

  /** 当前路由模式是否为 hash */
  static readonly IS_HASH_ROUTER = import.meta.env.VITE_ROUTER_MODE === 'hash'

  /** 是否开启路由切换时的顶部进度条 */
  static readonly ENABLE_ROUTER_NPROGRESS = import.meta.env.VITE_ROUTER_NPROGRESS === 'true'

  /** 是否开启请求接口时的顶部进度条 */
  static readonly ENABLE_REQUEST_NPROGRESS = import.meta.env.VITE_REQUEST_NPROGRESS === 'true'

  /** 请求超时时间 单位秒 | 0 表示无超时时间 */
  static readonly REQUEST_TIMEOUT = (isStringNumber(import.meta.env.VITE_REQUEST_TIMEOUT) ? +import.meta.env.VITE_REQUEST_TIMEOUT : 0) * 1000

  /** 请求接口地址的公共前缀字段 */
  static readonly REQUEST_BASE_API = import.meta.env.VITE_BASE_API
}
