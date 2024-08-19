import { defineConfig, loadEnv } from 'vite' // 使用 defineConfig 工具函数，这样不用 jsdoc 注解也可以获取类型提示
import { warpperEnv, pathResolve } from './build' // 引入对环境变量的处理函数
import { generateVitePlugins } from './build/plugins' // 引入抽离出去的 vite 插件集合

/** 当前执行 node 命令时文件夹的地址（工作目录） 即项目根目录（也就是 index.html 文件所在的位置） */
const root: string = process.cwd()

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀
  const VITE_ENV = warpperEnv(loadEnv(mode, root, 'VITE_')) // 对原生环境变量进行二次处理
  const isBuild = command === 'build' // 当前是否是生产模式

  return {
    // 部署应用包时的基本 URL
    base: VITE_ENV.VITE_PUBLIC_PATH,

    plugins: generateVitePlugins(VITE_ENV, isBuild),

    resolve: {
      alias: [
        /** 设置 `@` 指向 `src` 目录 */
        { find: '@', replacement: pathResolve('src') },
        /** 设置 `#` 指向 `types` 目录 */
        { find: '#', replacement: pathResolve('types') },
      ],
    },

    server: {
      /** 设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址 */
      host: true,
      /** 指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口 */
      port: VITE_ENV.VITE_SERVER_PORT,
      /** 端口被占用时，是否直接退出 | 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口 */
      strictPort: false,
      /** 是否自动打开浏览器 */
      open: VITE_ENV.VITE_AUTO_OPEN,
      /** 是否允许跨域 */
      cors: true,
      /** 反向代理配置（主要是开发时用来解决跨域问题） */
      proxy: {
        [VITE_ENV.VITE_BASE_API]: {
          target: VITE_ENV.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(VITE_ENV.VITE_BASE_API, ''),
        },
      },
    },

    css: {
      /** 通过多线程运行 CSS 预处理器，从而极大提高其处理速度 */
      preprocessorMaxWorkers: true,
    },

    build: {
      /** 指定打包文件的输出目录。默认值为 dist ，当 dist 被占用或公司有统一命名规范时，可进行调整 */
      outDir: VITE_ENV.VITE_OUTPUT_DIR,
      /** 图片转 base64 编码的阈值。为防止过多的 http 请求，Vite 会将小于此阈值的图片转为 base64 格式 */
      assetsInlineLimit: 4096,
      /** 规定触发警告的 chunk 大小。（以 kbs 为单位） */
      chunkSizeWarningLimit: 1024,
      /** 启用/禁用 CSS 代码拆分 */
      cssCodeSplit: true,
      /** 构建后是否生成 source map 文件 */
      sourcemap: false,
      /** 是否在构建阶段将 publicDir 目录中的所有文件复制到 outDir 目录中 */
      copyPublicDir: true,
      /** 指定使用哪种混淆器。默认为 esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2% */
      minify: 'esbuild',
      rollupOptions: {
        output: {
          // 引入文件名的名称
          chunkFileNames: 'js/[name]-[hash].js',
          // 包的入口文件名称
          entryFileNames: 'js/[name]-[hash].js',
          // 对打包出来的资源文件进行分类，分别放到不同的文件夹内
          assetFileNames(chunkInfo) {
            // css 样式文件
            if (chunkInfo.name.endsWith('.css')) {
              return 'css/[name]-[hash].css'
            }
            // 字体文件
            const fontExtList = ['.ttf', '.otf', '.woff', '.woff2', '.eot']
            if (fontExtList.some((ext) => chunkInfo.name.endsWith(ext))) {
              return 'font/[name]-[hash].[ext]'
            }
            // 图片文件
            const imgExtList = ['png', 'jpg', '.jpeg', 'gif', 'webp']
            if (imgExtList.some((ext) => chunkInfo.name.endsWith(ext))) {
              return `img/[name]-[hash].[ext]`
            }
            // 视频文件
            const videoExtList = ['.mp4', '.avi', '.wmv', '.ram', '.mpg', 'mpeg', '.m3u8']
            if (videoExtList.some((ext) => chunkInfo.name.endsWith(ext))) {
              return `video/[name]-[hash].[ext]`
            }
            // 音频文件
            const audioExtList = ['.mp3', '.flac', '.wav', '.aac', '.ape', '.m4a']
            if (audioExtList.some((ext) => chunkInfo.name.endsWith(ext))) {
              return `audio/[name]-[hash].[ext]`
            }
            // 其它文件: 保存在 assets/文件名-哈希值.扩展名
            return 'assets/[name]-[hash].[ext]'
          },
          // 打包的文件进行拆包处理
          manualChunks(chunk) {
            // 这个 chunk 就是所有文件的绝对路径
            // 因为 node_modules 中的依赖通常是不会改变的 所以直接单独打包出去
            // 这个 return 的值就是打包的名称
            // 可以利用浏览器的缓存机制 减少请求次数
            if (chunk.includes('node_modules')) return 'vendor'
          },
        },
      },
    },

    /** 打包后移除所有的 console、debugger */
    esbuild: {
      drop: VITE_ENV.VITE_DROP_CONSOLE ? ['console', 'debugger'] : [],
    },
  }
})
