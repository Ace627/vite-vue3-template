# vite-vue3-template

## 项目拉取

```bash
# 克隆项目
git clone https://github.com/Ace627/vite-vue3-template.git

# 进入项目目录
cd vite-vue3-template

# 安装依赖 | 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug
pnpm install

# 启动服务
pnpm dev
```

## 文件参考

- `src/utils/download.ts` 常用下载方法
- `src/utils/request.ts` axios 的二次封装
- `src/utils/validate.ts` 常用校验方法
- `src/utils/status-code.ts` 常见响应状态码的解析处理
- `src/hooks/useToken.ts` 对 Token 使用的 hooks 封装
- `src/hooks/useNProgress.ts` 对顶部请求进度条使用的 hooks 封装
- `src/hooks/useEnv.ts` 对环境变量 `VITE_` 使用的封装
- `src/config/constants.ts` 常量统一声明文件
- `src/config/permission.ts` 全局路由守卫配置文件 | 鉴权
- `src/styles/reset.scss` 重置样式表
- `src/styles/common.scss` 公共样式表
- `src/enums/index.ts` 常用枚举值 | 可以拆分到目录中
- `src/components/QrCode/index.vue` 二维码组件

## 使用须知

- [Vite 不再支持已 EOL 的 NodeJS 14 / 16 / 17 / 19。现在需要 NodeJS 18 / 20+](https://cn.vitejs.dev/guide/migration.html#migration-from-v4)

## 参考文献

- [Vite 配置路径别名的流程](https://juejin.cn/post/7302249949215457319)
- [Vite 全局组件的自动批量化注册](https://juejin.cn/post/7304183129896124416)
- [VueRouter 中 Meta 字段的类型声明](https://juejin.cn/post/7302241918351163426)
- [npm 的配置文件 .npmrc](https://juejin.cn/post/7325427710754422784)
