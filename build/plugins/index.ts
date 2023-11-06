import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { createHtmlPlugin } from 'vite-plugin-html'

/**
 * @description 生成 vite 的插件配置项数组
 * @param {ImportMetaEnv} viteEnv 环境变量
 * @param {boolean} isBuild 是否为生产模式
 */
export function generateVitePlugins(viteEnv: ImportMetaEnv, isBuild: boolean): PluginOption[] {
  const { VITE_APP_TITLE } = viteEnv

  const plugin_list: PluginOption[] = [
    vue({ include: [/\.vue$/] }),

    AutoImport({
      imports: ['vue', 'pinia', 'vue-router'], // 自动导入 vue、vue-router、Pinia 相关函数
      dts: 'types/auto-import.d.ts',
      dirs: ['src/store/modules', 'src/hooks'], // 配置其它需要导入的文件目录
    }),

    createHtmlPlugin({
      // 在这里写 entry 后，你将不需要在 `index.html` 内添加 script 标签，原有标签需要删除
      entry: 'src/main.ts',
      // 是否压缩 html
      minify: true,
      // 需要注入 index.html ejs 模版的数据
      inject: {
        data: { title: VITE_APP_TITLE, buildTime: new Date().toLocaleString() },
      },
    }),
  ]

  return plugin_list
}
