import { GlobalComponents } from 'vue'

export {}

declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: (typeof import('../components/SvgIcon/index.vue'))['default']
    ProChart: (typeof import('../components/ProChart/index.vue'))['default']
    ProTable: (typeof import('../components/ProTable/index.vue'))['default']
    ProPagination: (typeof import('../components/ProPagination/index.vue'))['default']
  }
}
