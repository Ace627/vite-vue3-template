export {}

declare module 'vue' {
  export interface GlobalComponents {
    QrCode: typeof import('../src/components/QrCode/index.vue')['default']
  }
}
