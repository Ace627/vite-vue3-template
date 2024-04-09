/** 参考 Bootstrap 的响应式设计 WIDTH = 992 */
const WIDTH = 992

/** 根据大小变化重新布局 */
export default () => {
  const route = useRoute()
  const appStore = useApp()

  const _isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const _resizeHandler = () => {
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

  watch(
    () => route.name,
    () => {
      if (appStore.device === 'mobile' && appStore.sidebar.opened) {
        appStore.closeSidebar(false)
      }
    },
  )

  onBeforeMount(() => {
    window.addEventListener('resize', _resizeHandler)
  })

  onMounted(() => {
    if (_isMobile()) {
      appStore.device = 'mobile'
      appStore.closeSidebar(true)
    }
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', _resizeHandler)
  })
}
