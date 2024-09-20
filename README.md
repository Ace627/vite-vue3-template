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

## 项目简介

本仓库提供了一个基于 `Vue3`、`TypeScript` 和 `Vite` 的基础配置模板，旨在帮助开发者快速搭建现代化前端项目。该模板集成了常用的开发工具和最佳实践，适合作为个人项目、团队协作或大型应用开发的起点，帮助你专注于业务逻辑的实现，而无需从零开始配置项目环境。

- 前端采用 `Vite`、`Vue3`、`VueRouter`、`Pinia`、`TypeScript`、`UnoCSS`、`Sass`、`Axios`

## 内置功能

- 加载提示：网络请求和路由切换时页面顶部会出现加载进度条，可在 `.env` 文件配置
- 接口代理 `.env.development` 的 `VITE_BASE_URL` 即可
- 接口路径：如有公共路径，请直接拼于 `/dev-api/接口公共路径`
- 请求缓存：统一给 `get` 请求加上时间戳参数，避免从缓存中拿数据
- 请求超时：支持配置网络请求超时的毫秒数，可在 `.env` 文件配置
- 路径别名：`@` 代表 `src`，`#` 代表 `types`
- 资源分类：已对打包出来的资源文件进行分类处理，分别放到不同的文件夹内
- 拆包处理：对打包的文件进行拆包处理，以便利用浏览器的缓存机制，减少请求次数
- 清除日志：打包后移除所有的 `console`、`debugger`，可在 `.env.production` 文件配置
- XSS 攻击：解决 `v-html` 指令潜在的 `xss` 攻击，请改用 `v-dompurify-html`
- 样式重置：利用重置样式表解决 `HTML` 元素在各浏览器显示效果不一致的问题

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

- [Vite 已不再支持 EOL 的 NodeJS 14 / 16 / 17 / 19。现在需要 NodeJS 18 / 20+](https://cn.vitejs.dev/guide/migration.html#migration-from-v4)
- 集成富文本编辑器，但其图片、视频上传接口仅做了拦截，应用项目时请务必去 `src/components/Editor/index.vue` 中自行适配所属项目的上传逻辑

## 特征说明

- 已配置 `Vue`、`VueRouter` 等 Api 的自动导入
- 已封装二维码功能，具体参数见 `src/components/QrCode/index.vue`
- 已解决 v-html 指令潜在的 xss 攻击（vue-dompurify-html 代替 v-html）
- 打包时对业务内静态图片资源和 `index.html` 进行压缩处理
- 打包时默认移除所有的 `console`、`debugger`
- 打包时进行最小化拆包，解决 js 包之间的依赖问题，提升加载时间

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
