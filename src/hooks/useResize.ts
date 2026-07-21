/** 参考 Bootstrap 的响应式设计将最大移动端宽度设置为 992 */
/** https://element-plus.org/zh-CN/component/layout#col-attributes */
const MAX_MOBILE_WIDTH = 768

/** 根据浏览器宽度变化，变换 Layout 布局 */
export function useResize() {
  const route = useRoute()
  const appStore = useAppStore()

  /** 用于判断当前设备是否为移动端 */
  function _isMobile(): boolean {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < MAX_MOBILE_WIDTH
  }

  /** 用于处理窗口大小变化事件 */
  function _resizeHandler() {
    if (document.hidden) return
    appStore.device = _isMobile() ? 'mobile' : 'desktop'
    document.documentElement.dataset['device'] = appStore.device
    if (appStore.isMobile) appStore.closeSidebar(true)
  }

  /** 监听路由变化，根据设备类型调整布局 */
  watch(
    () => route.name,
    () => {
      if (appStore.isMobile && !appStore.isCollapse) appStore.closeSidebar(false)
    },
    { immediate: true },
  )

  /** 在组件挂载前添加窗口大小变化事件监听器 */
  onBeforeMount(() => window.addEventListener('resize', _resizeHandler))

  /** 在组件挂载后根据窗口大小判断设备类型并调整布局 */
  onMounted(() => _resizeHandler())

  /** 在组件卸载前移除窗口大小变化事件监听器 */
  onBeforeUnmount(() => window.removeEventListener('resize', _resizeHandler))
}
