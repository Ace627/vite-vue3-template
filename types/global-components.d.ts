export {}

declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: typeof import('../src/components/SvgIcon/index.vue')['default']
    RichEditor: typeof import('../src/components/RichEditor/index.vue')['default']
    ApTaiChi: typeof import('../src/components/ApTaiChi/index.vue')['default']
    AutoWrapList: typeof import('../src/components/AutoWrapList/index.vue')['default']
    InnerLink: typeof import('../src/components/InnerLink/index.vue')['default']
    QRCode: typeof import('../src/components/QRCode/index.vue')['default']
  }
}
