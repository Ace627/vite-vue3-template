export {}

declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: typeof import('../src/components/SvgIcon/index.vue')['default']
    ApTaiChi: typeof import('../src/components/ApTaiChi/index.vue')['default']
    ApWrapList: typeof import('../src/components/ApWrapList/index.vue')['default']
    Editor: typeof import('../src/components/Editor/index.vue')['default']
    InnerLink: typeof import('../src/components/InnerLink/index.vue')['default']
    QRCode: typeof import('../src/components/QRCode/index.vue')['default']
  }
}
