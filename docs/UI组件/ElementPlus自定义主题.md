# Element Plus 自定义主题

## 功能定位

通过 sass 变量覆盖与官方暗黑 css-vars，统一定制 Element Plus 的主题色与暗黑模式，无需运行时主题切换库。

## 实现要点

| 文件 | 职责 |
|---|---|
| `vite.config.ts`（css.preprocessorOptions.scss.additionalData） | `@use "@/styles/element-plus/el-theme-light.scss"` 为每段样式注入亮色主题变量 |
| `src/styles/index.scss` | `@use .../el-theme-dark.scss` 引入官方暗黑 css-vars（`html.dark` 下生效） |
| `src/styles/element-plus/el-theme-light.scss` | `@forward 'element-plus/theme-chalk/src/common/var.scss' with (...)` 覆盖 `primary`(#0077ff) 等 |
| `src/styles/element-plus/el-theme-dark.scss` | `@use 'element-plus/theme-chalk/src/dark/css-vars.scss'` 官方暗黑 vars |

机制：

- **亮色**：`additionalData` 在每个组件样式编译前注入 `el-theme-light.scss`，用 `@forward ... var.scss with (...)` 覆盖 SCSS 变量（`primary`/`success`/`warning`/`danger`/`font-family`/`bg-color` 等），组件样式据此换肤。
- **暗黑**：`el-theme-dark.scss` `@use` 官方 `dark/css-vars.scss`，产出 `html.dark` 作用域的 CSS 变量；由 `Navbar` 的 `ThemeSwitch` 切换 `html.dark` 类整体生效。

## 好处

- **集中可维护**：主色等一处定义，全组件统一，避免散落覆盖。
- **明暗同源**：亮 / 暗共享同一套变量体系，切换无闪烁。
- **无运行时开销**：编译期注入，不引入主题切换库。

## 工程化好处

- **主题与构建解耦**：`additionalData` 在编译期注入，组件样式编译即换肤。
- **标准化定制范式**：给出"如何正确覆盖 EP 主题变量"的最小配置，参照成本低。
- **与主题切换协同**：暗黑 vars 由 `html.dark` 驱动，复用既有明暗开关（见主题切换相关说明）。

## 注意事项

- 暗黑主色仍为 EP 默认蓝 `#409eff`（亮色 `#0077ff`）；如需一致，取消注释 `el-theme-dark.scss` 的 `@forward ... dark/var.scss with (primary: #0077ff)` 并调整。
- 变量覆盖必须用 `@forward ... var.scss with (...)` 语法，直接写 CSS 变量不生效。
- `additionalData` 仅声明变量，勿在其中写实际样式，否则产物中样式重复。
- 组件按需引入见 `ElementPlus按需引入.md`（拆为独立文档）。
