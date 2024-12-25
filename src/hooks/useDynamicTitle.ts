export default () => {
  // 获取当前路由对象，用来获取当前页面的路径和元信息
  const route = useRoute()
  // 获取存储用户设置的 store，这里用于获取是否启用动态标题的设置
  const settingStore = useSettingStore()
  // 获取应用程序的默认标题，通常在 .env 文件中定义
  const appTitle = import.meta.env.VITE_APP_TITLE

  const stopWatchDynamicTitle = watch(
    // 设置 watch 来观察路由的路径 (route.path) 和是否显示动态标题 (settingStore.showDynamicTitle)。当这些值发生变化时，会根据条件更新页面标题
    [() => route.path, () => settingStore.showDynamicTitle],
    ([_, showDynamicTitle]) => {
      // 如果不启用动态标题或当前路由没有 meta.title，则使用默认的应用标题
      if (!showDynamicTitle || !route.meta.title) {
        document.title = appTitle
      } else {
        // 否则，动态标题会以 路由的title - 默认应用标题 的格式展示
        document.title = `${route.meta.title} - ${appTitle}`
      }
    },
    { immediate: true },
  )

  onUnmounted(() => {
    // 组件销毁时，停止 watch，清理相关的监听器
    stopWatchDynamicTitle()
  })
}
