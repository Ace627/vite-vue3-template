---
title: git-commit-msg
description: 项目 Git 提交规范流程（严格两步 + 最终提交前强制自检）
agent_created: true
---

# git-commit-msg

## 触发语
用户说「提交代码」或等价表达时触发。

## 流程

### 第一步：生成候选 message
1. 先查看真实改动：`git status -s` + `git diff HEAD --stat`
2. 基于改动生成 **5 条彼此有差异的单行中文候选 message**，格式：`<type>: <简述>`
   - 中文动词开头，≤50 字，无句号
   - 候选超过 4 条时必须用**纯文本**列出 1-5，不能用快捷组件
3. 列出候选，等待用户回复编号（1-5）

常用 type：`build` / `chore` / `perf` / `refactor` / `feat` / `fix` / `docs` / `test` / `style` / `ci`

### 第二步：确认提交方式
用户选定 message 后，单独再问一次提交方式：
- 提交到暂存区（git add + git commit，不推送）
- 提交并推送（git add + git commit + git push）
- 跳过

### 第三步：最终提交前强制自检（关键约束）
**在用户确认提交方式后、执行 git add 前，必须执行本自检，不可跳过。**

1. 执行 `git status --short`
2. 若输出为空 → 停止，告知用户「当前无改动可提交」
3. 若输出非空 → 列出所有未提交文件，**重点检查 `.workbuddy/` 是否有改动**
4. `.workbuddy/` 目录下的所有改动**必须一并纳入本次提交**，禁止单列、禁止询问用户「是否一起提交」
5. 提示用户本次将提交的文件清单，等待用户最终确认
6. 用户确认后，使用**最新** `git status --short` 的结果进行 `git add`（优先 `git add -A` 或按列出的文件 add），然后 `git commit -m "<message>"`

### 原则
- 所有写操作（add / commit / push）必须用户确认，绝不自动执行
- 不要基于过时的文件列表 add；每次 add 前必须以最新的 `git status --short` 为准
- 提交后不再追加编辑 `.workbuddy/memory/*.md` 等文件，避免再次产生脏数据；如需追加，必须再提交

## 历史纠偏
此前曾误记为「只输出不擅自 commit」而直接 commit，已纠正：必须 5 候选 + 两步确认 + 最终自检。
