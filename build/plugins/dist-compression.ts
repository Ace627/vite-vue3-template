import type { PluginOption } from 'vite'
import compression from 'vite-plugin-compression2'

/**
 * 构建期产物 gzip 预压缩
 *  - 对 >10KB 的 JS/CSS/JSON/HTML/SVG 等生成 .gz 预压缩文件；保留原文件，
 *  - 服务端需开启 gzip_static（nginx）或 CDN 预压缩才会被直接发出，否则 .gz 不会被使用。
 * @link https://github.com/nonzzz/vite-plugin-compression#readme
 */
export function setupCompressionPlugin(): PluginOption {
  return compression({
    // 压缩算法与等级：用 gzip，level 9 = 最高压缩率（体积最小，构建略慢）。
    // 等级范围 1~9：1 最快体积最大，9 最慢体积最小；前端静态资源用 9 最划算。
    algorithms: [['gzip', { level: 9 }]],

    // 体积门槛：只压大于 10KB 的文件（10 * 1024 = 10KB）。
    // 小文件压了也省不了多少、甚至可能略增，跳过它们避免产生无用产物。
    threshold: 10 * 1024,

    // 是否删原文件：false = 保留原始 JS/CSS。
    // 服务端没开 gzip_static 时仍能发原文件，部署更稳、可灰度回退。
    deleteOriginalAssets: false,

    // 只压这些后缀：JS/CSS/JSON/HTML/ICO/SVG 等文本类静态资源。
    // 图片/字体通常已自带压缩，不在名单里，避免重复压缩浪费。
    include: /\.(js|css|json|html|ico|svg)(\?.*)?$/i,

    // 构建日志级别：silent = 静默，不刷压缩过程信息，保持构建输出干净。
    logLevel: 'silent',
  })
}
