import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// 单一真源：package.json 的 description。dev/build 时由下方插件自动注入
// index.html 的 <meta name="description">（占位符 __APP_DESCRIPTION__），
// 因此两处永不漂移——只需维护 package.json 一处即可。
const { description } = JSON.parse(
  readFileSync(fileURLToPath(new URL('./package.json', import.meta.url)), 'utf-8'),
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'inject-meta-description',
      transformIndexHtml(html) {
        return html.replace('__APP_DESCRIPTION__', description ?? '')
      },
    },
  ],
})
