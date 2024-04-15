import { defineConfig, presetAttributify, presetUno } from 'unocss'

/**
 * UnoCSS中文网 https://unocss.nodejs.cn
 * UnoCSS 样式速查表 https://unocss.dev/interactive
 */
export default defineConfig({
  presets: [
    /** 默认预设，包括Tailwind CSS、Windi CSS、Bootstrap、Tachyons，可以使用以上任意规则 https://unocss.nodejs.cn/presets/uno */
    presetUno(),
    /** 属性化模式预设 https://unocss.nodejs.cn/presets/attributify */
    presetAttributify(),
  ],

  /** 规则定义工具类和生成的 CSS。UnoCSS 有许多内置规则，但也允许轻松添加自定义规则 https://unocss.nodejs.cn/config/rules */
  rules: [
    // ['wh-full', { width: '100%', height: '100%' }],
  ],

  /** 受 Windi CSS 的 启发，快捷方式可让你将多个规则组合成一个简写 https://unocss.nodejs.cn/config/shortcuts */
  shortcuts: {
    'wh-full': 'w-full h-full',
    'wh-screen': 'w-screen h-screen',
  },
})
