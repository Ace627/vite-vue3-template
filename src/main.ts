import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import store from './store'
import router from './router'
import './config/permission'

async function bootstrap() {
  const app = createApp(App)
  app.use(store)
  app.use(router)
  await router.isReady()
  app.mount('#app')
}

bootstrap()
