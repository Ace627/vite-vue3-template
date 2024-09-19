import type { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import AutoComponents from 'unplugin-vue-components/vite'

/** 自带 api 的自动化导入 */
export const registerAutoImport = (): PluginOption => {
  return AutoImport({
    imports: ['vue', 'pinia', 'vue-router'], // 自动导入 vue、vue-router、Pinia 相关函数
    dts: 'types/auto-generate/auto-import.d.ts',
    dirs: ['src/store/modules', 'src/hooks'], // 配置其它需要导入的文件目录
  })
}

/** 组件及其类型的自动化导入 */
export const registerAutoComponents = (): PluginOption => {
  return AutoComponents({
    dts: 'types/auto-generate/auto-components.d.ts',
    dirs: [], // 配置其它需要导入的文件目录 'src/components'
  })
}
