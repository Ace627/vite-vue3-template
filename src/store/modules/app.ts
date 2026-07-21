export const useAppStore = defineStore('app', () => {
  /** 是否折叠菜单 */
  // const isCollapse = ref<boolean>(getSidebarStatus())
  const isCollapse = ref<boolean>(false)
  /** 是否移除侧栏和主容器的过渡效果 */
  const withoutAnimation = ref<boolean>(false)
  /** 设备类型 */
  const device = ref<'desktop' | 'mobile'>('desktop')

  /** 关闭侧边栏（主要用于移动端状态下） */
  function closeSidebar(hasAnimation: boolean = false): void {
    isCollapse.value = true
    // setSidebarStatus(isCollapse.value)
    withoutAnimation.value = hasAnimation
  }

  return { device, isCollapse, closeSidebar }
})
