/**
 * 正常情况下我们默认 query 中的参数都是 string 类型
 * 其实如果你的链接上有多个同名 query，route.query 会返回一个数组，但是绝大多数情况下我们不会这样玩
 * 所以直接扩展 route.query 的类型为  Record<string, string> 比较通用
 */
type VueRouteQuery = Record<string, string>

/**
 * 如果你确定你的应用只使用有限的几个已知类型的 query，也可以声明成类似如下的形式
 */
// interface VueRouteQuery {
//   token: string
//   id: string
//   taskId: string
// }
