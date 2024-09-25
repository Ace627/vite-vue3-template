# 一、依赖安装

```bash
pnpm i @types/node -D
```

# 二、vite.config.ts

## 2.1、第一种配置

```ts
// 使用 defineConfig 工具函数，这样不用 jsdoc 注解也可以获取类型提示
import { defineConfig } from 'vite'
import { pathResolve } from './build'

/** 当前执行 node 命令时文件夹的地址（工作目录） 即项目根目录（也就是 index.html 文件所在的位置） */
const root: string = process.cwd()

export default defineConfig({
  resolve: {
    alias: [
      /** 设置 `@` 指向 `src` 目录 */
      { find: '@', replacement: pathResolve('src') },
      /** 设置 `#` 指向 `types` 目录 */
      { find: '#', replacement: pathResolve('types') },
    ],
  },
})
```

## 2.2、第二种配置

```ts
// 用于处理和解析 URL 的模块
import { fileURLToPath, URL } from 'node:url'
// 使用 defineConfig 工具函数，这样不用 jsdoc 注解也可以获取类型提示
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      /** 设置 `@` 指向 `src` 目录 */
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      /** 设置 `#` 指向 `types` 目录 */
      '#': fileURLToPath(new URL('./types', import.meta.url)),
    },
  },
})
```

# 三、tsconfig.json

无论用上方哪种流程，此处都需要配置

```json
{
  "compilerOptions": {
    // 解析非相对模块名的基准目录
    "baseUrl": "./",
    // 模块名到基于 baseUrl 的路径映射的列表
    "paths": {
      "@/*": ["src/*"],
      "#/*": ["types/*"]
    }
  }
}
```
