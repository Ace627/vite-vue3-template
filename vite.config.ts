import { fileURLToPath } from 'node:url'

import { defineConfig, loadEnv } from 'vite'

import { setupVitePlugins } from './build/plugins/index.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const runtimeConfig = loadEnv(mode, process.cwd())

  return {
    // 部署应用包时的基本 URL
    base: runtimeConfig.VITE_PUBLIC_PATH ?? '/',

    plugins: setupVitePlugins(),

    resolve: {
      alias: {
        /** 设置 `@` 指向 `src` 目录 */
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    build: {
      // 指定打包文件的输出目录。默认值为 dist ，当 dist 被占用或公司有统一命名规范时，可进行调整
      outDir: runtimeConfig.VITE_OUTPUT_DIR ?? 'dist',
      /** 图片转 base64 编码的阈值。为防止过多的 http 请求，Vite 会将小于此阈值的图片转为 base64 格式 */
      assetsInlineLimit: 4096,
      /** 规定触发警告的 chunk 大小。（以 kbs 为单位） */
      chunkSizeWarningLimit: 4096,
      /** 启用/禁用 CSS 代码拆分 */
      cssCodeSplit: true,
      /** 构建后是否生成 source map 文件 */
      sourcemap: false,
      /** 是否在构建阶段将 publicDir 目录中的所有文件复制到 outDir 目录中 */
      copyPublicDir: true,
      rolldownOptions: {
        checks: {
          pluginTimings: false, // 禁用插件计时器检查，以提高构建性能
        },
        output: {
          // 引入文件名的名称
          chunkFileNames: 'js/[name]-[hash].js',
          // 包的入口文件名称
          entryFileNames: 'js/[name]-[hash].js',
          // 打包的文件进行拆包处理
          codeSplitting: {
            groups: [
              { name: 'vue', test: /node_modules[\\/](vue|@vue)[\\/]/, priority: 16 },
              { name: 'pinia', test: /node_modules[\\/]pinia[\\/]/, priority: 15 },
              { name: 'vue-router', test: /node_modules[\\/]vue-router[\\/]/, priority: 14 },
              { name: 'axios', test: /node_modules[\\/]axios[\\/]/, priority: 13 },
              { name: 'dayjs', test: /node_modules[\\/]dayjs[\\/]/, priority: 12 },
            ],
          },
          minify: {
            compress: {
              // 是否移除 console 语句（环境变量不为 'false' 时启用，默认启用）
              dropConsole: runtimeConfig.VITE_DROP_CONSOLE !== 'false',
              // 是否移除 debugger 调试语句（环境变量不为 'false' 时启用，默认启用）
              dropDebugger: runtimeConfig.VITE_DROP_DEBUGGER !== 'false',
            },
          },
        },
      },
    },

    css: {
      /**
       * 如果启用了这个选项，那么 CSS 预处理器会尽可能在 worker 线程中运行；即通过多线程运行 CSS 预处理器，从而极大提高其处理速度
       * https://cn.vitejs.dev/config/shared-options#css-preprocessormaxworkers
       */
      preprocessorMaxWorkers: true,
      /**
       * 建议只用来嵌入 SCSS 的变量声明文件，嵌入后全局可用
       * 该选项可以用来为每一段样式内容添加额外的代码。但是要注意，如果你添加的是实际的样式而不仅仅是变量，那这些样式在最终的产物中会重复。
       * https://cn.vitejs.dev/config/shared-options.html#css-preprocessoroptions-extension-additionaldata
       */
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element-plus/el-theme-light.scss";`,
        },
      },
    },

    server: {
      // 允许外部访问（团队协作时，其他设备可通过 IP 访问本地项目）
      host: true,
      // 指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口
      // 开发环境端口（项目建议避开 80、443 等常用端口，防止冲突）
      port: parseInt(runtimeConfig.VITE_SERVER_PORT),
      /** 端口被占用时，是否直接退出 | 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口 */
      strictPort: false,
      /** 是否允许跨域 */
      cors: true,
      /** 反向代理配置（主要是开发时用来解决跨域问题） */
      proxy: {
        [runtimeConfig.VITE_BASE_API]: {
          target: runtimeConfig.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace('/dev-api', ''),
        },
      },
    },
  }
})
