declare module '*.module.scss' {
  const classes: ScssModuleClasses
  export default classes
}

/// <reference types="vite/client" />

// 解决 TypeScript 无法识别 .vue 文件的异常
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 方便在代码中获取这些以 VITE_ 为前缀的用户自定义环境变量的 TypeScript 智能提示
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  // 后端接口公共路径
  readonly VITE_BASE_API: string
  // VueRouter 的路由模式 hash | history
  readonly VITE_ROUTER_MODE: 'hash' | 'history'
  // 是否移除打包后的 conole.log 日志打印
  readonly VITE_DROP_CONSOLE: '0' | '1'
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
