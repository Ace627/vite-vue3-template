// 解决 TypeScript 无法识别 .vue 文件的异常
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
