import type { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

export function registerGlobalComponent(app: App<any>) {
  app.component('SvgIcon', SvgIcon)
}
