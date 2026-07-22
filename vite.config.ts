import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { setupVitePlugins } from './build/plugins/index.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const runtimeConfig = loadEnv(mode, process.cwd())

  return {
    plugins: setupVitePlugins(),

    resolve: {
      alias: {
        /** 设置 `@` 指向 `src` 目录 */
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    build: {
      rolldownOptions: {
        output: {
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

    server: {
      // 允许外部访问（团队协作时，其他设备可通过 IP 访问本地项目）
      host: true,
      // 指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口
      // 开发环境端口（项目建议避开 80、443 等常用端口，防止冲突）
      port: parseInt(runtimeConfig.VITE_SERVER_PORT),
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
