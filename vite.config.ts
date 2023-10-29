import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import autoprefixer from 'autoprefixer' // 自动补全 CSS 浏览器前缀，以兼容旧浏览器
import { warpperEnv } from './build'

/** 当前执行 node 命令时文件夹的地址（工作目录） */
const root: string = process.cwd()

/** 路径拼接函数，简化代码 */
const pathResolve = (path: string): string => resolve(root, path)

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀
  const VITE_ENV: ImportMetaEnv = warpperEnv(loadEnv(mode, root, 'VITE_'))

  return {
    // 部署应用包时的基本 URL
    base: VITE_ENV.VITE_PUBLIC_PATH,

    plugins: [
      vue({
        include: [/\.vue$/],
      }),
      AutoImport({
        imports: ['vue', 'pinia', 'vue-router'], // 自动导入 vue、vue-router、Pinia 相关函数
        dts: 'types/auto-import.d.ts',
        dirs: ['src/store/modules', 'src/hooks'], // 配置其它需要导入的文件目录
      }),
      createHtmlPlugin({
        // 在这里写 entry 后，你将不需要在 `index.html` 内添加 script 标签，原有标签需要删除
        entry: 'src/main.ts',
        // 是否压缩 html
        minify: true,
        // 需要注入 index.html ejs 模版的数据
        inject: {
          data: { title: VITE_ENV.VITE_APP_TITLE, buildTime: new Date().toLocaleString() },
        },
      }),
    ],

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
      port: 5173,
      /** 端口被占用时，是否直接退出 | 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口 */
      strictPort: false,
      /** 是否自动打开浏览器 */
      open: false,
      /** 是否允许跨域 */
      cors: true,
      /** 反向代理配置（主要是开发时用来解决跨域问题） */
      proxy: {
        [VITE_ENV.VITE_BASE_API]: {
          target: VITE_ENV.VITE_BASE_URL,
          changeOrigin: true,
        },
      },
    },

    css: {
      postcss: {
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
      },
    },

    build: {
      /** 指定打包文件的输出目录。默认值为 dist ，当 dist 被占用或公司有统一命名规范时，可进行调整 */
      outDir: VITE_ENV.VITE_OUTPUT_DIR,
      /** 图片转 base64 编码的阈值。为防止过多的 http 请求，Vite 会将小于此阈值的图片转为 base64 格式 */
      assetsInlineLimit: 4096,
      /** 规定触发警告的 chunk 大小。（以 kbs 为单位） */
      chunkSizeWarningLimit: 500,
      /** 启用/禁用 CSS 代码拆分 */
      cssCodeSplit: true,
      /** 构建后是否生成 source map 文件 */
      sourcemap: false,
      /** 是否在构建阶段将 publicDir 目录中的所有文件复制到 outDir 目录中 */
      copyPublicDir: true,
      /** 指定使用哪种混淆器。默认为 esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2% */
      minify: 'esbuild',
    },

    /** 打包后移除所有的 console、debugger */
    esbuild: {
      drop: VITE_ENV.VITE_DROP_CONSOLE ? ['console', 'debugger'] : [],
    },
  }
})
