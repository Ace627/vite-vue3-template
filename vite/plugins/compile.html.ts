import dayjs from 'dayjs'
import type { PluginOption } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export const registerHtmlPlugin = (viteEnv: ViteEnv, isBuild: boolean): PluginOption => {
  const { VITE_APP_TITLE } = viteEnv

  return createHtmlPlugin({
    // 在这里写 entry 后，你将不需要在 `index.html` 内添加 script 标签，原有标签需要删除
    entry: 'src/main.ts',
    // 是否压缩 html
    minify: isBuild,
    // 需要注入 index.html ejs 模版的数据
    inject: {
      data: { VITE_APP_TITLE, buildTime: dayjs().format(`YYYY-MM-DD HH:mm:ss`) },
    },
  })
}
