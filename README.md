# vite-vue3-template

## 项目拉取

```bash
# 克隆项目 基础模板
git clone https://github.com/Ace627/vite-vue3-template.git

# 自动按需引入 Ant Design Vue
git clone https://github.com/Ace627/vite-vue3-template.git -b ant-design-vue

# 自动按需引入 Element Plus
git clone https://github.com/Ace627/vite-vue3-template.git -b element-plus

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
- 删除 `src/layout/index.vue`，然后 `src/layout/index_v1.vue` 重命名为 `index.vue`，删除 `src/views/Example` 文件夹，重启项目即可获得最纯净的基础模板

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
