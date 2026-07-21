import SvgIcon from '@/components/SvgIcon/index.vue'
import type { App } from 'vue'

export function registerGlobalComponent(app: App<any>) {
  app.component('SvgIcon', SvgIcon)
}
