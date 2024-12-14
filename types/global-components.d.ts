export {}

declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: typeof import('../src/components/SvgIcon/index.vue')['default']
    Markdown: typeof import('../src/components/Markdown/index.vue')['default']
    Screenfull: typeof import('../src/components/Screenfull/index.vue')['default']
    RichEditor: typeof import('../src/components/RichEditor/index.vue')['default']
    AutoWrapList: typeof import('../src/components/AutoWrapList/index.vue')['default']
    QRCode: typeof import('../src/components/QRCode/index.vue')['default']
  }
}
