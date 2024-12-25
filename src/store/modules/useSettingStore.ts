export default defineStore('setting', () => {
  /** 是否显示动态标题 */
  const showDynamicTitle = ref<boolean>(true)

  return { showDynamicTitle }
})
