import autoprefixer from 'autoprefixer' // 自动补全 CSS 浏览器前缀，以兼容旧浏览器

export default {
  plugins: [
    /**
     * 这里插播一下：为什么有些属性需要添加前缀呢？
     * 因为 CSS 中有一些属性还没有确定下来，标准规范还没有发布，许多浏览器支持的程度也不同，而且每个浏览器厂商同一个样式支持的写法也不同，
     * 所以要加前缀来达到各个浏览器兼容，将来统一了规范就不用写前缀了。
     * last 10 versions 所有主流浏览器最近 10 个版本⽤
     */
    autoprefixer({
      // 声明需要支持的浏览器版本
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8', 'last 10 versions'],
      // 是否应为网格布局添加 IE 10-11 的前缀
      grid: true,
    }),
  ],
}
