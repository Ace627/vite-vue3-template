export {}

declare module 'vue' {
  export interface GlobalComponents {
    AutoWrapList: typeof import('../src/components/AutoWrapList/index.vue')['default']
    Editor: typeof import('../src/components/Editor/index.vue')['default']
    IconFont: typeof import('../src/components/IconFont/index.vue')['default']
    InnerLink: typeof import('../src/components/InnerLink/index.vue')['default']
    QRCode: typeof import('../src/components/QRCode/index.vue')['default']
  }
}
