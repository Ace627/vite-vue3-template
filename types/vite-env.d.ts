interface ImportMetaEnv {
  /** 应用默认标题 */
  VITE_APP_TITLE: string

  /** 后端接口公共路径 */
  VITE_BASE_API: string

  /** 后端接口代理地址 */
  VITE_BASE_URL: string

  /** 指定打包文件的输出目录 */
  VITE_OUTPUT_DIR: string

  /** 打包后移除所有的 console、debugger */
  VITE_DROP_CONSOLE: boolean

  /** 部署应用包时的基本 URL */
  VITE_PUBLIC_PATH: string
}

interface ImportMeta {
  /** 利用 Readonly 泛型工具类全部修改为只读属性 */
  readonly env: Readonly<ImportMetaEnv>
}
