import { createApp } from 'vue'
import './styles/index.scss'
import router from './router'
import store from './store' // 状态管理
import App from './App.vue' // 全局唯一根组件

import 'virtual:svg-icons-register'
import './config/permission' // 权限控制

const app = createApp(App)

import SvgIcon from './components/SvgIcon/index.vue'
app.component('SvgIcon', SvgIcon)

app.use(router)
app.use(store)
app.mount('#app')
