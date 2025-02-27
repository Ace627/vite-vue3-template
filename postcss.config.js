export default {
  plugins: {
    // 兼容浏览器，添加前缀
    autoprefixer: {
      // 声明需要支持的浏览器版本
      overrideBrowserslist: ['last 2 versions', '> 1%', 'not dead'],
      // 是否应为网格布局添加 IE 10-11 的前缀
      grid: true,
    },
  },
}
