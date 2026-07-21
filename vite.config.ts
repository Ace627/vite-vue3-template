import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'

import { setupVitePlugins } from './build/plugins/index.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: setupVitePlugins(),
  resolve: {
    alias: {
      /** 设置 `@` 指向 `src` 目录 */
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
