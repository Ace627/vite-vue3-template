import 'vue-router'

declare module 'vue-router' {
	/**
	 * 路由记录中的 meta 字段的类型接口
	 * 文件地址：types/vue-router/route-meta.d.ts
	 * 官网文献：https://router.vuejs.org/zh/guide/advanced/meta.html#TypeScript
	 */
	interface RouteMeta extends Partial<VueRouteMeta> {}
}
