/** 默认布局组件 */
export const DEFAULT_LAYOUT = () => import('@/layout/index.vue')

/** 默认首页 */
export const HOME_PAGE_URL = '/dashboard'

/** 默认登录页 */
export const LOGIN_PAGE_URL = '/login'

/** 重定向页的路由地址 */
export const REDIRECT_PAGE_URL = '/redirect'

/** 免登录白名单（匹配路由 path） */
export const PATH_WHITE_LIST: string[] = ['/login', '/register']

/** 免登录白名单（匹配路由 name） */
export const NAME_WHITE_LIST: string[] = []

/** 当前路由模式是否为 hash */
export const IS_HASH_ROUTER = import.meta.env.VITE_ROUTER_MODE === 'hash'

/** 部署应用包时的基本 URL */
export const PUBLIC_PAHT = import.meta.env.VITE_PUBLIC_PATH
