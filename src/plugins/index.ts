import type { App } from 'vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import { registerGlobalComponent } from './modules/global-component'

export function setupPlugins(app: App) {
  /** 解决 v-html 指令潜在的 xss 攻击 v-dompurify-html */
  app.use(VueDOMPurifyHTML)
  /** 批量注册全局组件 */
  app.use(registerGlobalComponent)
}
