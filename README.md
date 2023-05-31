# Vite + Vue3 + TypeScript 项目骨架

## 项目拉取

```bash
# 克隆项目
git clone https://github.com/Ace627/vite-vue3-template.git

# 进入项目目录
cd vite-vue3-template

# 安装依赖 | 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug
npm install

# 启动服务
npm run dev
```

## 技术选型

Vue3、TypeScript、Axios、VueRouter4、Pinia、NProgress、Sass 等

## 内置功能

- 设置 @ 指向 src 目录
- 对 axios 进行的的简易二次封装
- 内置常用的校验方法 utils/validate.ts
- 对 Vue、VueRouter、Pinia 等库的 api 可以免引入使用
- 对 Pinia 模块的自动化引入 src/store/modules 下 useXxx 格式的文件
- 浏览器默认样式的重置 reset.scss
- 集成 scss 的模块导出以及 TypeScript 语法识别
- 打包后自动移除 console 与 debugger

## 可选功能

- [Element Plus 自动按需导入](https://zhuanlan.zhihu.com/p/611238863)
- [如何实现 Pinia 的持久化存储](https://zhuanlan.zhihu.com/p/614302570)
- [一款轻量级的时间处理库 Dayjs](https://dayjs.fenxianglu.cn)
