/// <reference types="vite/client" />

// 扩展 ImportMetaEnv 接口，添加自定义环境变量类型
interface ImportMetaEnv {
  /** 应用默认标题 */
  VITE_APP_TITLE: string

  /** 部署应用包时的基本 URL */
  VITE_PUBLIC_PATH: string

  /** 指定打包文件的输出目录 */
  VITE_OUTPUT_DIR: string

  /** 后端接口代理地址 */
  VITE_BASE_URL: string

  /** 后端接口公共路径 */
  VITE_BASE_API: string

  /** 路由的模式 hash | history */
  VITE_ROUTER_MODE: string

  /** 请求超时时间 单位秒 | 0 表示无超时时间 请务必输入正整数类型的数值 */
  VITE_REQUEST_TIMEOUT: string

  /** 开发服务器的监听端口 */
  VITE_SERVER_PORT: string

  /** 打包后移除所有的 console */
  VITE_DROP_CONSOLE: string

  /** 打包后移除所有的 debugger */
  VITE_DROP_DEBUGGER: string
}

// 扩展 ImportMeta 接口，确保类型提示生效
interface ImportMeta {
  readonly env: ImportMetaEnv
}
