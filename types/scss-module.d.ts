/**
 * SCSS 导出变量的类型声明文件
 *  - src/styles/variables.scss 变量声明文件
 *  - src/styles/export.module.scss 变量导出文件
 */

interface ScssModuleClasses {
  baseSidebarWidth: string
}

declare module '*.module.scss' {
  const classes: Readonly<ScssModuleClasses>
  export default classes
}
