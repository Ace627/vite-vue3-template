import type { App } from 'vue'
import { createPinia } from 'pinia'

/** 创建 Pinia 实例（全局状态管理核心） */
const store = createPinia()

/**
 * 注册 Pinia 到 Vue 应用实例
 * @param app Vue 应用实例（createApp 创建的根实例）
 */
export function setupStore(app: App) {
  // 挂载 Pinia 到全局，使所有组件可访问状态
  app.use(store)
}
