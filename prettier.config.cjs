/**
 * 修改配置后请务必重启编辑器，否则会不生效或延迟生效
 * 配置文档：https://prettier.io/docs/en/configuration.html
 * 插件地址：https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
 * @type {import("prettier").Config}
 */
module.exports = {
  /** 箭头函数仅有一个参数时，参数是否添加括号 */
  arrowParens: 'always',
  /** 每行代码的长度限制 */
  printWidth: 180,
  /** 使用单引号而不是双引号 */
  singleQuote: true,
  /** 在所有代码语句的末尾添加分号 */
  semi: false,
  /** 对象或者数组的最后一个元素后面不要加逗号 */
  trailingComma: 'all',
  /** 指定一个制表符等于的空格数 */
  tabWidth: 2,
  /** 使用制表符缩进，而不是空格缩进 */
  useTabs: false,
  /** 缩进 Vue SFC 文件中的 `<script>` 和 `<style>` 标签 */
  vueIndentScriptAndStyle: false,
  /** 允许 Prettier 格式化 `node_modules` 中的文件 */
  withNodeModules: false
}
