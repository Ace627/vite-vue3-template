import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { registerAutoImport, registerAutoComponents } from './auto-import-plugin.ts'

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

  return plugins
}
