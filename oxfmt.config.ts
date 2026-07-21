import { defineConfig } from 'oxfmt'

export default defineConfig({
  // ============ 基础格式 ============

  printWidth: 160, // 单行最大宽度
  tabWidth: 2, // 缩进宽度
  useTabs: false, // 用空格缩进
  semi: false, // 语句末尾加 ;
  singleQuote: true, // 使用单引号
  trailingComma: 'all', // 多行结构末尾加逗号
  bracketSpacing: true, // 对象字面量括号内加空格：{ foo: bar }
  arrowParens: 'always', // 箭头函数始终加括号：(x) => x
  endOfLine: 'lf', // 换行符统一为 LF

  // ============ 忽略模式 ============

  ignorePatterns: ['dist/', 'node_modules/', 'src/types/auto-generate/', 'pnpm-lock.yaml'],

  // ============ 导入排序 ============

  sortImports: {
    internalPattern: ['^@/'], // @/ 开头的视为内部导入
    order: 'asc', // 按字母升序
  },
})
