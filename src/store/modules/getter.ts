/**
 * 定义一个名为 'getter' 的 Pinia 存储，用于提供基于其他存储的派生状态
 */
export const useGetterStore = defineStore('getter', () => {
  const appStore = useAppStore()

  /**
   * 判断当前设备是否为移动设备
   */
  const isMobile = computed(() => appStore.device === 'mobile')

  /**
   * 判断当前设备是否为桌面设备
   */
  const isDesktop = computed(() => appStore.device === 'desktop')

  return { isMobile, isDesktop }
})
