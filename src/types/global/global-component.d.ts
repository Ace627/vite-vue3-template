import { GlobalComponents } from 'vue'

export {}

declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: (typeof import('../components/SvgIcon/index.vue'))['default']
    ProPagination: (typeof import('../components/ProPagination/index.vue'))['default']
  }
}
