/**
 * 方便在代码中获取这些以 VITE_ 为前缀的用户自定义环境变量的 TypeScript 智能提示
 * import.meta.env 的类型声明文件
 */
interface ImportMetaEnv {
  VITE_APP_TITLE: string // 应用标题
  VITE_BASE_URL: string // 接口地址
  VITE_BASE_API: string // 后端接口公共路径
  VITE_ROUTER_MODE: string // VueRouter 的路由模式 hash | history
  VITE_DROP_CONSOLE: string // 是否移除打包后的 conole.log 日志打印
  VITE_OUT_DIR: string // 指定打包文件的输出目录
}

interface ImportMeta {
  readonly env: Readonly<ImportMetaEnv>
}
