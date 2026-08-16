import type { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import ProChart from '@/components/ProChart/index.vue'
import ProTable from '@/components/ProTable/index.vue'
import ProPagination from '@/components/ProPagination/index.vue'

export function registerGlobalComponent(app: App<any>) {
  app.component('SvgIcon', SvgIcon)
  app.component('ProChart', ProChart)
  app.component('ProTable', ProTable)
  app.component('ProPagination', ProPagination)
}
