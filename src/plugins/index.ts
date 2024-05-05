import type { App } from 'vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'

export function setupPlugins(app: App) {
  /** 解决 v-html 指令潜在的 xss 攻击 v-dompurify-html */
  app.use(VueDOMPurifyHTML)
}
