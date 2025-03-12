import minipic from 'vite-plugin-imagemin'

export const registerImageMini = () => {
  return minipic({
    gifsicle: {
      interlaced: true, // 隔行扫描
      optimizationLevel: 3, // 压缩级别（0-3）
    },
    optipng: {
      optimizationLevel: 5, // 压缩级别（0-7），值越大压缩率越高
    },
    mozjpeg: {
      quality: 80, // 压缩质量（0-100）
      progressive: true, // 渐进式加载
      smooth: 2, // 平滑处理，减少色彩失真
    },
    svgo: {
      plugins: [
        { name: 'removeViewBox', active: false }, // 保留 viewBox 以防止 SVG 变形
        { name: 'removeEmptyAttrs', active: true }, // 移除空属性
        { name: 'convertColors', params: { currentColor: true } }, // 颜色转换
      ],
    },
    webp: {
      quality: 80, // WebP 质量（0-100）
      lossless: false, // 是否无损压缩
      method: 6, // 压缩方法（0-6），数值越大，压缩率越高但速度变慢
    },
    pngquant: {
      quality: [0.8, 0.9], // PNG 质量范围
      speed: 4, // 压缩速度（1-10），数值越大速度越快但压缩率降低
    },
    /** 是否在控制台输出压缩结果 */
    verbose: true,
  })
}
