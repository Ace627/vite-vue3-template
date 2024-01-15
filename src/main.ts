import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import store from './store'
import router from './router'
import './config/permission'
import { registerGlobalComponents } from '@/components' // 批量自动化注册全局组件

async function bootstrap() {
  const app = createApp(App)

  /** 批量自动化注册全局组件 */
  app.use(registerGlobalComponents)
  app.use(store)
  app.use(router)
  await router.isReady()
  app.mount('#app')
  // setTimeout(() => app.mount('#app'), 500000)
}

bootstrap()
