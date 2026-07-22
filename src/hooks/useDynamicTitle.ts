export function useDynamicTitle() {
  // 获取当前路由对象，用来获取当前页面的路径和元信息
  const route = useRoute()

  // 获取应用程序的默认标题，通常在 .env 文件中定义
  const appTitle = import.meta.env.VITE_APP_TITLE

  watch(
    // 设置 watch 来观察路由的路径 (route.path) 。当这些值发生变化时，会根据条件更新页面标题
    [() => route.path],
    () => {
      // 如果不启用动态标题或当前路由没有 meta.title，则使用默认的应用标题
      if (!route.meta.title) {
        document.title = appTitle
      } else {
        // 否则，动态标题会以 路由的title - 默认应用标题 的格式展示
        document.title = `${route.meta.title} - ${appTitle}`
      }
    },
    { immediate: true },
  )
}
