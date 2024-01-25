import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import store from './store'
import router from './router'
import './config/permission'

async function bootstrap() {
  /** 创建 Vue 应用实例 */
  const app = createApp(App)

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
