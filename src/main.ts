import 'virtual:uno.css'
import '@/styles/index.scss'
import { createApp } from 'vue'
import App from '@/App.vue'
import { setupStore } from '@/store'

async function bootstrap() {
  const app = createApp(App)

  // 配置 Store 状态管理 https://pinia.web3doc.top
  setupStore(app)

  app.mount('#app')

  console.log('系统初始化完成')
}

bootstrap()
