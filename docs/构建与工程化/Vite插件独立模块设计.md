# Vite 插件独立模块设计

## 功能定位

将 Vite 插件从 `vite.config.ts` 抽离到 `build/plugins/` 独立模块，由 `setupVitePlugins()` 统一汇总，配置即装配、单一出口。

## 实现要点

| 文件 | 职责 |
|---|---|
| `build/plugins/index.ts` | `setupVitePlugins()` 汇总注册所有插件，返回 `PluginOption[]` |
| `build/plugins/auto-import-plugin.ts` | `registerAutoImport` / `registerAutoComponents`（Element Plus 自动导入，见 `../UI组件/ElementPlus按需引入.md`） |
| `build/plugins/svg-icons-plugin.ts` | `registerSvgIcons()`（SvgIcon 运行时 sprite 注册，规范见 `../AGENTS.md`） |
| `build/plugins/dist-compression.ts` | `setupCompressionPlugin()`（生产构建 gzip 预压缩），详细说明见 `构建与工程化/构建期Gzip预压缩.md` |
| `vite.config.ts` | 仅调用 `setupVitePlugins()`，不内联插件逻辑 |
| `tsconfig.node.json` | 将 `build/**/*.ts` 纳入类型检查；`nodenext` 下相对导入需带 `.ts` |

机制：

- 每个插件封装为独立函数（`registerXxx` / `setupXxx`），单文件单职责。
- `index.ts` 将各插件函数返回值组合为数组并返回，作为 `plugins` 的唯一来源。
- 模块内相对导入带 `.ts` 扩展名（如 `from './svg-icons-plugin.ts'`），满足 `nodenext` 解析要求。

## 好处

- **配置即装配**：`vite.config.ts` 极简，只声明"用哪些插件"，不关心"插件怎么写"。
- **单文件单职责**：每个插件可独立阅读、修改、调试。
- **可复用**：插件函数可被其他 Node 配置（如预览 / 测试）复用。

## 工程化好处

- **关注点分离**：构建配置与插件实现解耦，配置层与实现层职责清晰。
- **类型安全**：`build/**` 纳入 `tsconfig.node.json`，插件代码享受 TS 检查（`noUnusedLocals` 等）。
- **模块解析确定**：`nodenext` + 显式 `.ts` 后缀，避免扩展名推断歧义。
- **可复制范式**：给出"如何组织 Vite 插件"的模板结构，AI 或协作者可直接参照落地。

## 注意事项

- 每个插件函数返回 `PluginOption`（或数组），由 `index.ts` 汇总，不要散落在 `vite.config.ts`。
- `nodenext` 下 `build/plugins` 内部相对导入必须带 `.ts`（如 `'./svg-icons-plugin.ts'`），否则类型检查报错。
- `vite.config.ts` 通过 `import { setupVitePlugins } from './build/plugins/index.ts'` 引入。
- 具体插件能力（Element Plus 自动导入、SvgIcon、gzip 预压缩）见各自文档 / 约定。
