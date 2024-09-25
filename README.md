<p align="center">
	<img alt="logo" src="./src/assets/images/logo.png" width="64" height="64" />
</p>

<h1 align="center">vite-vue3-template</h1>

<p align="center">
  <img src="https://img.shields.io/github/languages/code-size/Ace627/vite-vue3-template" alt="code size"/>
  <img src="https://img.shields.io/github/languages/count/Ace627/vite-vue3-template" alt="languages"/>
  <img src="https://img.shields.io/github/last-commit/Ace627/vite-vue3-template" alt="last commit"/> 
  <a href="https://www.pnpm.cn" target="_blank">
    <img src="https://img.shields.io/badge/pnpm-9.9.0-blue" alt="pnpm version"/><br>
  </a>
  <a href="https://github.com/Ace627" target="_blank">
    <img src="https://img.shields.io/badge/Author-当时只道是寻常-orange" alt="Author" />
  </a>

<p>

<hr />

本仓库提供了一个基于 `Vue3`、`TypeScript` 和 `Vite` 的基础配置模板，旨在帮助开发者快速搭建现代化前端项目。该模板集成了常用的开发工具和最佳实践，适合作为个人项目、团队协作或大型应用开发的起点，帮助你专注于业务逻辑的实现，而无需从零开始配置项目环境。

- 技术选型：`Vite`、`Vue3`、`VueRouter`、`Pinia`、`TypeScript`、`UnoCSS`、`Sass`、`Axios`
- 样式重置：利用重置样式表解决 `HTML` 元素在各浏览器显示效果不一致的问题
- 加载提示：网络请求和路由切换时页面顶部会出现加载进度条，可在 `.env` 文件配置
- 接口代理 `.env.development` 的 `VITE_BASE_URL` 即可
- 接口路径：如有公共路径，请直接拼于 `/dev-api/接口公共路径`
- 请求缓存：统一给 `get` 请求加上时间戳参数，避免从缓存中拿数据
- 请求超时：支持配置网络请求超时的毫秒数，可在 `.env` 文件配置
- 路径别名：`@` 代表 `src`，`#` 代表 `types`
- XSS 攻击：解决 `v-html` 指令潜在的 `xss` 攻击，请改用 `v-dompurify-html`
- 文件压缩：打包时对业务内静态图片资源和 `index.html` 进行压缩处理
- 资源分类：已对打包出来的资源文件进行分类处理，分别放到不同的文件夹内
- 拆包处理：对打包的文件进行最小化拆包拆包处理，以便利用浏览器的缓存机制，减少请求次数
- 清除日志：打包后移除所有的 `console`、`debugger`，可在 `.env.production` 文件配置

## 使用教程

### 1.1 配置开发环境的代理转发

此处主要针对 `.env.development` 进行配置

**1.1.1 接口无公共路径的情况下：**

- 假如有代理：`http://www.dev.com`
- 有接口：`/user/list`、`/role/create` 等
- `VITE_BASE_URL = http://www.dev.com` 即可
- 正常请求如 `request.get('/user/list')`

**1.1.2 假如接口有公共路径**

- 比如：`/api/user/list`、`/api/role/create` 等
- 代理依旧按照步骤 1 配置
- 同时修改 `VITE_BASE_API = /dev-api/api` 即可
- 正常请求如 `request.get('/user/list')`

### 1.2 添加全局组件及其类型

- `src/components` 下新建一个目录，其内含有一个 `index.vue` 文件（`src/components/ComponentName/index.vue`）

```vue
<!-- 一个空白的组件模板 -->
<template>
  <div></div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ComponentName' })

const props = defineProps({})
</script>

<style lang="scss" scoped></style>
```

- 这时该组件会被自动注册为全局组件，但此时并无类型提示
- 打开 `types/global-components.d.ts`

```typescript
export {}

declare module 'vue' {
  export interface GlobalComponents {
    AutoWrapList: typeof import('../src/components/AutoWrapList/index.vue')['default']
  }
}
```

- 如上所示，将第 5 行复制一行到其下面，然后改 `AutoWrapList` 为你刚才新建的组件目录名即可
- 如果需要获取全局组件的实例对象，请参考下方代码

```typescript
import type { GlobalComponents } from 'vue'

const autoWrapListInstance = shallowRef<InstanceType<GlobalComponents['AutoWrapList']>>()

// 然后通过 autoWrapListInstance.value 即可带类型提示访问其暴露出的方法之类
```

## 环境准备

|     环境     |             名称版本              |                    下载地址                    |
| :----------: | :-------------------------------: | :--------------------------------------------: |
| **版本控制** |        Git - 版本控制工具         |     [下载](https://git-scm.com/downloads)      |
| **开发工具** |        Visual Studio Code         | [下载](https://code.visualstudio.com/Download) |
| **运行环境** | Node ≥18 (其中 20.6.0 版本不可用) |       [下载](http://nodejs.cn/download)        |

## 项目启动

```bash
# 克隆代码
git clone https://github.com/Ace627/vite-vue3-template.git

# 进入项目目录
cd vite-vue3-template

# 安装依赖 | 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug
pnpm install

# 启动服务
pnpm dev
```

## 使用须知

- `docs/*.md` 目录属于项目的使用教程及扩展思路，实际项目开发时可删除
- [Vite 已不再支持 EOL 的 NodeJS 14 / 16 / 17 / 19。现在需要 NodeJS 18 / 20+](https://cn.vitejs.dev/guide/migration.html#migration-from-v4)
- 集成富文本编辑器，但其图片、视频上传接口仅做了拦截，应用项目时请务必去 `src/components/Editor/index.vue` 中自行适配所属项目的上传逻辑

## 参考文献

- [SVG 引入插件的恶意提交修复](https://github.com/vbenjs/vite-plugin-svg-icons/issues/66)
- [UnoCSS 中文文档](https://unocss.nodejs.cn)
- [UnoCSS 样式速查表](https://unocss.dev/interactive)
- [Vite 配置路径别名的流程](https://juejin.cn/post/7302249949215457319)
- [Vite 全局组件的自动批量化注册](https://juejin.cn/post/7304183129896124416)
- [关于路由 Query 的类型声明问题](https://juejin.cn/post/7330835892276641833)
- [VueRouter 中 Meta 字段的类型声明](https://juejin.cn/post/7302241918351163426)
- [npm 的配置文件 .npmrc](https://juejin.cn/post/7325427710754422784)
- [关于 npm 包更新工具 npm-check-updates 使用详解](https://zhuanlan.zhihu.com/p/482923542)
- [iframe 父容器等高时出现异常滚动条](https://blog.csdn.net/tjj3027/article/details/99299821)
