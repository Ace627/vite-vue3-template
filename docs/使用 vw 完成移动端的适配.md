实现：使用 `vw` 完成移动端的适配

## 依赖安装

```bash
pnpm i postcss-px-to-viewport -D
```

## 配置 postcss.config.js

```JavaScript
export default {
  plugins: {
    // 像素单位转换插件（移动端适配方案）
    'postcss-px-to-viewport':{
      unitToConvert: 'px', // 需要转换的单位，默认 px
      viewportUnit: 'vw', // 转换后的视口单位
      viewportWidth: 375, // 设计稿视口宽度（对应标准移动端设计稿尺寸）
      unitPrecision: 5, // 转换后单位的精度（小数点位数）
      minPixelValue: 1, // 最小转换像素值（小于等于该值不转换）
      mediaQuery: false, // 是否转换媒体查询中的 px
      landscape: false, // 是否添加横屏媒体查询
      // landscapeWidth: 812, // 横屏时的视口宽度
      // landscapeUnit: 'vh', // 横屏使用的视口单位
    }
  }
}
```

## 注意事项

- 行内样式不会自动转换，需使用样式表
- 使用 VW 适配时，建议配合 meta 标签使用
- 1px 边框问题可通过 transform 或伪元素方案解决
- 设计稿测量值建议直接使用 px 单位（插件会自动转换）

## 参考文献

- [postcss-px-to-viewport 中文文档](https://github.com/evrone/postcss-px-to-viewport/blob/HEAD/README_CN.md)
- [vue3 移动端项目起手准备](https://juejin.cn/post/7406997325716111371?searchId=20250228023311BE2A26A6D617607A605D)
