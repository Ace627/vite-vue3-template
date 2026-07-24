// vite-plugin-svg-icons 运行时注入的虚拟模块。
// 该包 package.json 的 exports 未暴露 ./client 子路径（nodenext 解析会被拦），故此处手动声明。
declare module 'virtual:svg-icons-register'
declare module 'virtual:svg-icons-names'
