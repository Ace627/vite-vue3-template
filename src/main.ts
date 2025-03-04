import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
import { setupPlugins } from './plugins'
import { setupDirectives } from './directives'
import './styles/index.scss' // global css
import 'virtual:uno.css'
import 'virtual:svg-icons-register'

async function bootstrap() {
  /** 创建 Vue 应用实例 */
  const app = createApp(App)

  /** 自定义插件 */
  setupPlugins(app)

  /** 注册自定义指令 */
  setupDirectives(app)

  /** 配置 Store 状态管理 https://pinia.web3doc.top */
  setupStore(app)

  /** 配置 Router https://router.vuejs.org/zh */
  await setupRouter(app)

  /** 挂载应用 */
  app.mount('#app')

  console.log(`系统初始化完成`)
}

bootstrap()
