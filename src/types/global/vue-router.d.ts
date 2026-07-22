import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 路由标题，用于显示在侧边栏和面包屑中 */
    title?: string
    /** 路由图标 */
    icon?: string
    /** 是否在侧边栏隐藏 */
    hidden?: boolean
  }
}
