/**
 * 方便在代码中获取这些以 VITE_ 为前缀的用户自定义环境变量的 TypeScript 智能提示
 * import.meta.env 的类型声明文件
 */
interface ImportMetaEnv {
  // 应用标题
  VITE_APP_TITLE: string

  VITE_BASE_URL: string

  // 后端接口公共路径
  VITE_BASE_API: string

  // VueRouter 的路由模式 hash | history
  VITE_ROUTER_MODE: 'hash' | 'history'

  // 是否移除打包后的 conole.log 日志打印
  VITE_DROP_CONSOLE: '0' | '1'
}

interface ImportMeta {
  readonly env: Readonly<ImportMetaEnv>
}
