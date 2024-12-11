import { defineAsyncComponent, AsyncComponentLoader } from 'vue'
import type { App, Component } from 'vue'

/** 获取所有组件，该方法返回一个对象 */
const components: Record<string, Component> = import.meta.glob('../../components/**/index.vue')

export function registerGlobalComponent(app: App<any>) {
  // 遍历对象并注册异步组件
  for (const [key, value] of Object.entries(components)) {
    const componentName = key.match(/\/([^\/]+)\/index\.vue$/)?.at(1)
    if (!componentName) continue
    app.component(componentName, defineAsyncComponent(value as AsyncComponentLoader))
  }
}
