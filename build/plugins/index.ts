import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue' // 提供 Vue 3 单文件组件支持
import vueJsx from '@vitejs/plugin-vue-jsx' // 提供 Vue 3 JSX 支持
import { registerAutoImport } from './auto-import'
import { registerHtmlPlugin } from './compile.html'

/**
 * @description 生成 vite 的插件配置项数组
 * @param {ImportMetaEnv} viteEnv 环境变量
 * @param {boolean} isBuild 是否为生产模式
 */
export function generateVitePlugins(viteEnv: ImportMetaEnv, isBuild: boolean): PluginOption[] {
  const plugin_list: PluginOption[] = [
    /** 提供 Vue 3 单文件组件支持 */
    vue({ include: [/\.vue$/] }),

    /** 提供 Vue 3 JSX 支持 */
    vueJsx(),

    /** 自动跟踪依赖并导入所需的内容，避免手动导入的繁琐步骤 */
    registerAutoImport(),

    /** 针对 index.html，提供压缩和基于 ejs 模板功能，亦可对其注入动态数据 */
    registerHtmlPlugin(viteEnv),
  ]

  return plugin_list
}
