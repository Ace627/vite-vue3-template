import 'vue-router'

/** VueRouter 中 Meta 字段的类型声明 */
declare module 'vue-router' {
  // RouteLocationNormalizedLoaded 是 route 的类型 对其部分属性的类型进行重写
  interface RouteLocationNormalizedLoaded {
    query: Partial<VueRouteQuery> // types/vue-router/route-query.d.ts
    meta: Partial<VueRouteMeta> // types/vue-router/route-meta.d.ts
  }
}
