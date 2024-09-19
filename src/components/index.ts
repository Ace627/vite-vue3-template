import { defineAsyncComponent, AsyncComponentLoader } from 'vue'
import type { App } from 'vue'

/** 获取所有组件，该方法返回一个对象 */
const components = import.meta.glob('./**/index.vue')

export function setupGlobalComponents(app: App<any>) {
  // 遍历对象并注册异步组件
  for (const [key, value] of Object.entries(components)) {
    const name = key.split('/')[1]
    app.component(name, defineAsyncComponent(value as AsyncComponentLoader))
  }
}
