# SvgIcon 图标（SVG 图标方案）

## 功能定位

用 `vite-plugin-svg-icons` 运行时注入 sprite，配合统一 `<SvgIcon>` 组件按文件名引用图标；单色图标靠 `currentColor` 随主题变色，新增图标走清理脚本适配。

## 实现要点

| 文件 | 职责 |
|---|---|
| `src/components/SvgIcon/index.vue` | `SvgIcon` 组件，按 `name` 渲染 `<use href="#icon-[name]">`，`color` 默认 `currentColor`、`size` 默认 `1em` |
| `build/plugins/svg-icons-plugin.ts` | `registerSvgIcons()` 注册 `vite-plugin-svg-icons`（`iconDirs`=src/assets/svg-icons，`symbolId`=`icon-[name]`） |
| `src/main.ts` | `import 'virtual:svg-icons-register'` 注入 sprite 到 `body` |
| `scripts/svg-clean.ts` | `clean:svg` 清理 svg 冗余属性（fill/class/width/height 等），适配 `fill:currentColor` |
| `src/assets/svg-icons/` | 图标源目录，放入 `.svg` 即按文件名引用 |
| `src/types/global/global-component.d.ts` | `SvgIcon` 全局组件**手写**类型声明（非自动生成，详见 `UI组件/全局组件注册.md`） |

机制：

- 插件把 `src/assets/svg-icons` 下所有 svg 编译为 symbol，经 `virtual:svg-icons-register` 注入 `body` 的 sprite。
- `SvgIcon` 组件以 `<use href="#icon-[name]">` 引用对应 symbol。
- 图标名 = 文件名（不含 `.svg`）；`color` 默认 `currentColor`，故单色图标随主题文字色变化。

## 好处

- **统一图标来源**：单一 `<SvgIcon>` 组件，禁止 EP 图标 / 字体图标（见 `../AGENTS.md`）。
- **运行时注入 sprite**：无需逐个 import，按名渲染。
- **主题友好**：`currentColor` 单色图标随主题变色；固定色可显式传 `color`。
- **易扩展**：新增图标只放文件 + 跑 `pnpm clean:svg`。

## 工程化好处

- **与图标规范一致**：契合 `../AGENTS.md` 第 1、2 条——图标单一来源，组件图标位优先把 `<SvgIcon>` 放进插槽。
- **标准化流程**：清理脚本自动适配 `currentColor`，团队无需手改 svg 属性。
- **可复制范式**：给出"svg 图标 + 统一组件"的模板，AI 或协作者可直接参照。

## 注意事项

- 图标名 = `src/assets/svg-icons/` 下文件名；新增后跑 `pnpm clean:svg` 适配 `fill:currentColor`。
- 单色图标靠 `currentColor` 变色；需固定色时传 `color` prop，需固定尺寸时传 `size` prop。
- 组件图标位（`<el-button>` / `<el-input>` 等）优先把 `<SvgIcon>` 放进插槽，不引入 `element-plus` 图标组件（见 `../AGENTS.md` 第 2 条）。
- `virtual:svg-icons-register` 必须在 `src/main.ts` 引入，否则 sprite 不注入、图标不显示。
