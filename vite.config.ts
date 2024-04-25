import { resolve } from 'path' // path 模块提供了一些工具函数，用于处理文件与目录的路径
import { defineConfig, loadEnv, normalizePath } from 'vite' // 使用 defineConfig 工具函数，这样不用 jsdoc 注解也可以获取类型提示
import { warpperEnv } from './build' // 引入对环境变量的处理函数
import { generateVitePlugins } from './build/plugins' // 引入抽离出去的 vite 插件集合

/** 当前执行 node 命令时文件夹的地址（工作目录） 即项目根目录（也就是 index.html 文件所在的位置） */
const root: string = process.cwd()

/** 路径拼接函数，简化代码 用 normalizePath 解决 window 下的路径问题 */
const pathResolve = (path: string): string => normalizePath(resolve(root, path))

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
        [VITE_ENV.VITE_BASE_API]: { target: VITE_ENV.VITE_BASE_URL, changeOrigin: true },
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
      // rollupOptions: {
      //   /** 配置打包文件分类输出 */
      //   output: {
      //     chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
      //     entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
      //     assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
      //     /** JavaScript 最小化拆分包 让打开那个页面，加载那个页面的 js ，让其之间的关联足够小 */
      //     manualChunks(id) {
      //       id.includes('node_modules') && id.toString().split('node_modules/')[1].split('/')[0].toString()
      //     },
      //   },
      // },
    },

    /** 打包后移除所有的 console、debugger */
    esbuild: {
      drop: VITE_ENV.VITE_DROP_CONSOLE ? ['console', 'debugger'] : [],
    },
  }
})
