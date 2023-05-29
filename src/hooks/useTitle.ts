// 动态更改页面的 title（动态标题来自路由 meta 的 title 配置）

export default (title: string | undefined): void => {
  const defaultTitle: string = import.meta.env.VITE_APP_TITLE
  document.title = title ? `${title} - ${defaultTitle}` : defaultTitle
}
