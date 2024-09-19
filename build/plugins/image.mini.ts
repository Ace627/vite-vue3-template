import minipic from 'vite-plugin-imagemin'

export const registerImageMini = () => {
  return minipic({
    /** 无损压缩配置，无损压缩下图片质量不会变差 */
    optipng: {
      optimizationLevel: 7, // 选择 0 到 7 之间的优化级别
    },
    /** 有损压缩配置，有损压缩下图片质量可能会变差 */
    pngquant: {
      quality: [0.8, 0.9], // 压缩质量
      speed: 4, // 压缩速度，范围 0~11
    },
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false,
    },
    mozjpeg: {
      quality: 85, // 压缩质量
    },

    svgo: {
      plugins: [{ name: 'removeViewBox' }, { name: 'removeEmptyAttrs', active: false }],
    },

    /** 是否禁用 */
    disable: false,
    /** 是否在控制台输出压缩结果 */
    verbose: true,
  })
}
