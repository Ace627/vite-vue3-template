import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 是否固定在 tags-view */
    affix?: boolean
    /** 路由标题，用于显示在侧边栏和面包屑中 */
    title?: string
    /** 路由图标 */
    icon?: string
    /** 是否在侧边栏隐藏 */
    hidden?: boolean
    /** 高亮侧边栏菜单 */
    activeMenu?: string
    /** 是否缓存页面 */
    keepAlive?: boolean
    /** 是否始终显示为根路由 */
    alwaysShow?: boolean
  }
}
