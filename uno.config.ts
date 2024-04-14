import { defineConfig, presetAttributify, presetUno } from 'unocss'

/**
 * UnoCSS中文网 https://unocss.nodejs.cn
 * UnoCSS 样式速查表 https://unocss.dev/interactive
 */
export default defineConfig({
  presets: [
    presetUno(), // 默认预设 https://unocss.nodejs.cn/presets/uno
    presetAttributify(), // 属性化模式预设 https://unocss.nodejs.cn/presets/attributify
  ],
})
