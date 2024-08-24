import 'vue-router'

declare module 'vue-router' {
  // RouteLocationNormalizedLoaded 是 route 的类型 对其部分属性的类型进行重写
  interface RouteLocationNormalizedLoaded {
    query: Partial<VueRouteQuery> // types/vue-router/route-query.d.ts
  }

  /**
   * 路由记录中的 meta 字段的类型接口
   * 文件地址：types/vue-router/route-meta.d.ts
   * 官网文献：https://router.vuejs.org/zh/guide/advanced/meta.html#TypeScript
   */
  interface RouteMeta extends Partial<VueRouteMeta> {}
}
