import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import type { PluginOption } from 'vite'

import { registerAutoImport, registerAutoComponents } from './auto-import-plugin.ts'
import { registerSvgIcons } from './svg-icons-plugin.ts'
import { setupCompressionPlugin } from './dist-compression.ts'

/** 汇总并注册所有 Vite 插件 */
export function setupVitePlugins(): PluginOption[] {
  const plugins: PluginOption[] = []

  /** 提供 Vue 3 单文件组件支持 */
  plugins.push(vue())

  /** 即时按需的原子化 CSS 引擎 UnoCSS */
  plugins.push(UnoCSS())

  /** Vue / Pinia API 按需自动导入 */
  plugins.push(registerAutoImport())

  /** Vue 组件按需自动导入 */
  plugins.push(registerAutoComponents())

  /** 提供 SvgIcon 的使用支持 */
  plugins.push(registerSvgIcons())

  /** 构建期产物 gzip 预压缩（仅生产构建生效） */
  plugins.push(setupCompressionPlugin())

  return plugins
}
