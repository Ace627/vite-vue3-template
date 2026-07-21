import type { App } from 'vue'
import { registerGlobalComponent } from './modules/global-component'

export function setupPlugins(app: App) {
  /** 批量注册全局组件 */
  app.use(registerGlobalComponent)
}
