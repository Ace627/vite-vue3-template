export {}

declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: typeof import('../src/components/SvgIcon/index.vue')['default']
    AutoWrapList: typeof import('../src/components/AutoWrapList/index.vue')['default']
  }
}
