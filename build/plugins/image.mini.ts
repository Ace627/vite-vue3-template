import minipic from 'vite-plugin-minipic'

export const registerImageMini = () => {
  return minipic({
    /**
     * 图片压缩选项，和 sharp.js 的配置保持一致.关于更多sharp.js的配置项
     * https://sharp.pixelplumbing.com/api-output#jpeg
     */
    sharpOptions: {
      png: { quality: 70 },
      jpeg: { quality: 33 },
      jpg: { quality: 70 },
      avif: { quality: 75 },
      webp: { quality: 75 },
      gif: {},
    },

    /**
     * 你可以通过这个选项控制图片经过处理后的类型
     * from 是原始类型 to 是处理后的类型
     */
    // convert: [
    //   { from: 'png', to: 'webp' },
    //   { from: 'jpg', to: 'webp' },
    //   { from: 'jpeg', to: 'jpg' },
    // ],

    /**
     * 第一次压缩后会将已压缩文件存入磁盘中进行缓存以提高压缩速度
     * 如果不想占用本地磁盘空间将此值设置为 false，则每次都会全量压缩
     */
    cache: true,

    /**
     * 你可以通过通过这个选项排除不想要进行压缩的文件
     *  - 如果值为一个字符串数组，比如 exclude:['pic1.jpg','pic2.jpg'], 那么 pic1 和 pic2 将会被排除
     *  - 如果值为一个字符串，比如 exclude:'.jpg', 那么这个值将被作为一个正则表达式，所有的 .jpg 文件都会被排除在外
     *  - 如果 exclude 和 include 同时存在时，include将会失效
     */
    exclude: [],
  })
}
