# Element Plus 按需引入（自动导入）

## 功能定位

Element Plus 的组件与 API 经 unplugin 自动按需引入，不全局全量注册。

## 实现要点

| 文件 | 职责 |
|---|---|
| `build/plugins/index.ts` | `ElementPlus({ useSource: true })`：负责函数式 API（`ElMessage`/`ElMessageBox`/`ElNotification`/`ElLoading`）的样式注入 |
| `build/plugins/auto-import-plugin.ts` | `AutoImport` + `ElementPlusResolver({ importStyle: 'sass' })` 自动导入 API 名称；`AutoComponents` + 同 resolver 自动引入模板组件 `<el-xxx>` 及其 sass 源样式 |

机制（三者互补，缺一不可）：

- `unplugin-vue-components` + `ElementPlusResolver({ importStyle: 'sass' })`：模板组件与其 sass 样式按需解析。
- `unplugin-auto-import` + 同 `ElementPlusResolver`：仅自动导入 `ElMessage` 等 API 的**名称**（不注入样式）。
- `unplugin-element-plus({ useSource: true })`：补齐上述 resolver 不注入的、从 `'element-plus'` 显式 import 的函数式 API 样式。

## 好处

- 非全量引入，主 CSS 仅约 13KB、无 EP 独立 vendor chunk。
- 模板组件与 `ElMessage` 等 API 免手动 import。

## 工程化好处

- 三插件分工明确、互补，是一套可直接复用的按需引入配置。
- 组件图标位优先用 `<SvgIcon>`（见 `../AGENTS.md` 第 2 条），保持图标单一来源。
- 直接给出接入 Element Plus 的做法，新人照着配即可。

## 注意事项

- 三处插件缺一不可；曾误删 `unplugin-element-plus` 导致 `ElMessage` 样式丢失（已恢复）。
- 函数式 API（`ElMessage` 等）须从 `'element-plus'` 显式 import，其样式由 `unplugin-element-plus` 负责。
- 组件图标位优先 `<SvgIcon>`，不引入 EP 图标组件（见 `../AGENTS.md`）。
- 主题定制见 `ElementPlus自定义主题.md`（已拆为独立文档）。
