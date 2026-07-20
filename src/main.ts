import { createApp } from 'vue'
import 'virtual:uno.css'
import './styles/index.scss'
import App from './App.vue'

async function bootstrap() {
  const app = createApp(App)

  app.mount('#app')

  console.log('系统初始化完成')
}

bootstrap()
