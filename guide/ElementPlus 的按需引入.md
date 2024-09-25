# 一、依赖安装

```bash
pnpm i element-plus @element-plus/icons-vue
pnpm i unplugin-auto-import unplugin-element-plus unplugin-vue-components -D
```

# 二、配置自动导入

## 1.1 build/plugins/auto-import-plugin.ts

```ts
import type { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import AutoComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

/** 自带 api 的自动化导入 */
export const registerAutoImport = (): PluginOption => {
  return AutoImport({
    resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    imports: ['vue', 'pinia', 'vue-router'], // 自动导入 vue、vue-router、Pinia 相关函数
    dts: 'types/auto-generate/auto-import.d.ts',
    dirs: ['src/store/modules', 'src/hooks'], // 配置其它需要导入的文件目录
  })
}

/** 组件及其类型的自动化导入 */
export const registerAutoComponents = (): PluginOption => {
  return AutoComponents({
    resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    dts: 'types/auto-generate/auto-components.d.ts',
    dirs: ['src/components'], // 配置其它需要导入的文件目录
  })
}
```

## 1.2 build/plugins/index.ts

```ts
import type { PluginOption } from 'vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { registerAutoImport, registerAutoComponents } from './auto-import-plugin'

export function generateVitePlugins(viteEnv: ViteEnv, isBuild: boolean): PluginOption[] {
  const plugins: PluginOption[] = []

  /** 自动跟踪依赖并导入所需的内容，避免手动导入的繁琐步骤 */
  plugins.push(registerAutoImport())

  /** 提供组件自动按需导入及类型声明功能 */
  plugins.push(registerAutoComponents())

  /** Element Plus 样式自动按需导入 */
  plugins.push(ElementPlus({ useSource: true }))

  return plugins
}
```

# 三、组件库全局配置

```vue
<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView />
  </ElConfigProvider>
</template>

<script setup lang="ts">
defineOptions({ name: 'App' })
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<style lang="scss" scoped></style>
```

# 四、全局引入图标

## 1.1 src/plugins/element-icon.ts

```ts
import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export function registerElementIcon(app: App) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
```

## 1.2 src/plugins/index.ts

```ts
import type { App } from 'vue'
import { registerElementIcon } from './element-icon'

export function setupPlugins(app: App) {
  /** 导入 ElementPlus 所有图标并进行全局注册 */
  app.use(registerElementIcon)
}
```
