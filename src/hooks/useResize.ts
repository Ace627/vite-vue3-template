/** 参考 Bootstrap 的响应式设计将最大移动端宽度设置为 992 */
const MAX_MOBILE_WIDTH = 992

/** 根据浏览器宽度变化，变换 Layout 布局 */
export default () => {
  const route = useRoute()
  const appStore = useAppStore()

  /** 用于判断当前设备是否为移动端 */
  function _isMobile(): boolean {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < MAX_MOBILE_WIDTH
  }

  /** 用于处理窗口大小变化事件 */
  function _resizeHandler() {
    if (!document.hidden) {
      const isMobile = _isMobile()
      appStore.device = isMobile ? 'mobile' : 'desktop'

      if (isMobile) {
        appStore.closeSidebar(true)
      } else {
        if (!appStore.sidebar.opened) appStore.toggleSidebar()
      }
    }
  }

  /** 监听路由变化，根据设备类型调整布局 */
  watch(
    () => route.name,
    () => {
      if (appStore.device === 'mobile' && appStore.sidebar.opened) {
        appStore.closeSidebar(false)
      }
    },
  )

  /** 在组件挂载前添加窗口大小变化事件监听器 */
  onBeforeMount(() => window.addEventListener('resize', _resizeHandler))

  /** 在组件挂载后根据窗口大小判断设备类型并调整布局 */
  onMounted(() => {
    if (_isMobile()) {
      appStore.device = 'mobile'
      appStore.closeSidebar(true)
    }
  })

  /** 在组件卸载前移除窗口大小变化事件监听器 */
  onBeforeUnmount(() => window.removeEventListener('resize', _resizeHandler))
}
