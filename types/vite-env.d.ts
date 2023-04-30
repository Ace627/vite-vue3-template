/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 方便在代码中获取这些以 VITE_ 为前缀的用户自定义环境变量的 TypeScript 智能提示
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_BASE_API: string
  // 更多环境变量...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
