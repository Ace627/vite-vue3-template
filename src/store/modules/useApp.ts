import { getSidebarStatus, setSidebarStatus } from '@/utils/cache/local-storage'

/** 侧边栏配置类型 */
interface SidebarConfig {
  opened: boolean
  withoutAnimation: boolean
}

export default defineStore('app', () => {
  /** 侧边栏配置 */
  const sidebar = reactive<SidebarConfig>({
    opened: getSidebarStatus(),
    withoutAnimation: false,
  })

  /** 设备类型 */
  const device = ref<DeviceType>('desktop')
  const isMobile = computed(() => device.value === 'mobile')
  const isDesktop = computed(() => device.value === 'desktop')

  /** 面包屑开关菜单栏的回调 */
  function toggleSidebar() {
    sidebar.withoutAnimation = false
    sidebar.opened = !sidebar.opened
    setSidebarStatus(sidebar.opened)
  }

  /** 关闭侧边栏（主要用于移动端状态下） */
  function closeSidebar(withoutAnimation: boolean) {
    setSidebarStatus(false)
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
  }

  return { sidebar, device, isMobile, isDesktop, toggleSidebar, closeSidebar }
})
