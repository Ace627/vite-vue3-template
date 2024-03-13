import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue' // 提供 Vue 3 单文件组件支持
import vueJsx from '@vitejs/plugin-vue-jsx' // 提供 Vue 3 JSX 支持
import { registerAutoImport } from './auto-import'
import { registerAutoComponents } from './auto-components'
import { registerHtmlPlugin } from './compile.html'
import { registerImageMini } from './image.mini'
import ElementPlus from 'unplugin-element-plus/vite'

export function generateVitePlugins(viteEnv: ViteEnv, isBuild: boolean): PluginOption[] {
  const plugins: PluginOption[] = []

  /** 提供 Vue 3 单文件组件支持 */
  plugins.push(vue({ include: [/\.vue$/] }))

  /** 提供 Vue 3 JSX/TSX 支持 */
  plugins.push(vueJsx())

  /** 自动跟踪依赖并导入所需的内容，避免手动导入的繁琐步骤 */
  plugins.push(registerAutoImport())

  /** 提供组件自动按需导入及类型声明功能 */
  plugins.push(registerAutoComponents())

  /** Element Plus 样式自动按需导入 */
  plugins.push(ElementPlus({}))

  /** 针对 index.html，提供压缩和基于 ejs 模板功能，亦可对其注入动态数据 */
  plugins.push(registerHtmlPlugin(viteEnv, isBuild))

  if (isBuild) {
    /** 图片压缩插件，使用简单，重要的是它真的很快 🚀🚀🚀🚀 */
    plugins.push(registerImageMini())
  }

  return plugins
}
