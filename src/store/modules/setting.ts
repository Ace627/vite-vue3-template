type TransitionName = 'fade-transform' | 'el-fade-in-linear' | 'el-fade-in' | 'el-zoom-in-center' | 'el-zoom-in-top' | 'el-zoom-in-bottom'

export const useSettingStore = defineStore('setting', () => {
  /** 是否显示动态标题 */
  const showDynamicTitle = ref<boolean>(true)
  /** 路由转场动效 */
  const transition = ref<TransitionName>('fade-transform')

  return { showDynamicTitle, transition }
})
