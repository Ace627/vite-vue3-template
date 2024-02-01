import { createApp } from 'vue'
import VueDOMPurifyHTML from 'vue-dompurify-html' // Third Module
import './styles/index.scss'
import App from './App.vue'
import store from './store'
import router from './router'
import './config/permission'

async function bootstrap() {
  /** 创建 Vue 应用实例 */
  const app = createApp(App)

  /** 解决 v-html 指令潜在的 xss 攻击 v-dompurify-html */
  app.use(VueDOMPurifyHTML)

  /** 配置存储 */
  app.use(store)

  /** 配置路由 */
  app.use(router)

  /** 当路由准备好时再执行挂载 https://router.vuejs.org/zh/api/interfaces/Router.html#Methods-isReady */
  await router.isReady()

  /** 挂载应用 */
  app.mount('#app')
}

bootstrap()
