/** 原生读取出的环境变量类型 */

/** 原生读取出的环境变量经过处理后的类型 */
interface ViteEnv {
  /** 当前运行模式 */
  MODE: string
  /** 是否为开发环境 */
  DEV: boolean
  /** 是否为生产环境 */
  PROD: boolean

  /** 应用默认标题 */
  VITE_APP_TITLE: string
  /** 后端接口公共路径 */
  VITE_BASE_API: string
  /** 后端接口代理地址 */
  VITE_BASE_URL: string
  /** 指定打包文件的输出目录 */
  VITE_OUTPUT_DIR: string
  /** 部署应用包时的基本 URL */
  VITE_PUBLIC_PATH: string
  /** 路由模式 */
  VITE_ROUTER_MODE: 'hash' | 'history'

  /** 开发服务器的监听端口 */
  VITE_SERVER_PORT: number
  /** 请求超时时间 单位秒 */
  VITE_REQUEST_TIMEOUT: number
  /** 是否自动打开浏览器 */
  VITE_AUTO_OPEN: boolean
  /** 打包后移除所有的 console、debugger */
  VITE_DROP_CONSOLE: boolean
  /** 是否开启路由加载时的顶部进度条 */
  VITE_ROUTER_NPROGRESS: boolean
  /** 是否开启请求接口时的顶部进度条 */
  VITE_REQUEST_NPROGRESS: boolean
  /** 打包后是否移除所有的注释 */
  VITE_CLEAR_COMMENT: boolean
}

/** 声明一个 ViteEnv 类型的全局常量，但不会实际生成代码 */
declare const __RUNTIME_CONFIG__: ViteEnv
