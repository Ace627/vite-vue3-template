import AutoImport from 'unplugin-auto-import/vite'
import AutoComponents from 'unplugin-vue-components/vite'
import type { PluginOption } from 'vite'

/** 自带 API 的自动化导入（Vue / Pinia） */
export function registerAutoImport(): PluginOption {
  return AutoImport({
    imports: ['vue', 'pinia', 'vue-router'], // 项目已装 vue、pinia、vue-router，对应 API（ref/computed、defineStore、useRoute/useRouter 等）自动导入
    dts: 'src/types/auto-generate/auto-import.d.ts',
    dirs: ['src/store/modules', 'src/hooks'], // 自动导入这两个目录下的模块导出（与 main.ts 显式导入的 @/store 不冲突）
  })
}

/** 组件及其类型的自动化导入 */
export function registerAutoComponents(): PluginOption {
  return AutoComponents({
    dts: 'src/types/auto-generate/auto-components.d.ts',
    dirs: [], // 留空；全局组件的目录名/类型约定后续自定义后再配
  })
}
