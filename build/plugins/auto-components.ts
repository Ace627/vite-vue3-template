import type { PluginOption } from 'vite'
import AutoComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export const registerAutoComponents = (): PluginOption => {
  return AutoComponents({
    resolvers: [ElementPlusResolver()],
    dts: 'types/auto-generate/auto-components.d.ts',
    dirs: ['src/components'], // 配置其它需要导入的文件目录
  })
}
