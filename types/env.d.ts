/**
 * 方便在代码中获取这些以 VITE_ 为前缀的用户自定义环境变量的 TypeScript 智能提示
 *  声明 vite 环境变量的类型（如果未声明则默认是 any）
 */
interface ImportMetaEnv {
  VITE_APP_TITLE: string
  VITE_BASE_URL: string
  VITE_BASE_API: string
  VITE_ROUTER_MODE: 'hash' | 'history'
  VITE_DROP_CONSOLE: '0' | '1'
  VITE_OUTPUT_DIR: string
  VITE_PUBLIC_PATH: string
}

interface ImportMeta {
  readonly env: Partial<Readonly<ImportMetaEnv>>
}
