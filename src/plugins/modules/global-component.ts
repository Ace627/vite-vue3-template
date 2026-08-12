import type { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import ProTable from '@/components/ProTable/index.vue'
import ProPagination from '@/components/ProPagination/index.vue'

export function registerGlobalComponent(app: App<any>) {
  app.component('SvgIcon', SvgIcon)
  app.component('ProTable', ProTable)
  app.component('ProPagination', ProPagination)
}
