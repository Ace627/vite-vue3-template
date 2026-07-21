import 'virtual:uno.css'
import '@/styles/index.scss'
import { createApp } from 'vue'
import App from '@/App.vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupPlugins } from '@/plugins'

async function bootstrap() {
  // 创建 Vue 应用实例
  const app = createApp(App)

  // 配置插件
  setupPlugins(app)

  // 配置 Store 状态管理 https://pinia.web3doc.top
  setupStore(app)

  // 配置 Router https://router.vuejs.org/zh
  await setupRouter(app)

  // 挂载应用实例到 DOM 元素 #app 中
  app.mount('#app')

  console.log('系统初始化完成')
}

bootstrap()
