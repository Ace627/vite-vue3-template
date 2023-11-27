import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue' // 提供 Vue 3 单文件组件支持
import vueJsx from '@vitejs/plugin-vue-jsx' // 提供 Vue 3 JSX 支持
import { registerAutoImport } from './auto-import'
import { registerHtmlPlugin } from './compile.html'
import { registerImageMini } from './image.mini'

export function generateVitePlugins(viteEnv: ImportMetaEnv, isBuild: boolean): PluginOption[] {
  const plugins: PluginOption[] = []

  /** 提供 Vue 3 单文件组件支持 */
  plugins.push(vue({ include: [/\.vue$/] }))

  /** 提供 Vue 3 JSX 支持 */
  plugins.push(vueJsx())

  /** 自动跟踪依赖并导入所需的内容，避免手动导入的繁琐步骤 */
  plugins.push(registerAutoImport())

  /** 针对 index.html，提供压缩和基于 ejs 模板功能，亦可对其注入动态数据 */
  plugins.push(registerHtmlPlugin(viteEnv))

  /** 图片压缩插件，使用简单，重要的是它真的很快 🚀🚀🚀🚀 */
  isBuild && plugins.push(registerImageMini())

  return plugins
}
