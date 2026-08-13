import { getCachedViews, getVisitedViews, setCachedViews, setVisitedViews, type TagView } from '@/utils'

export const useTagsViewStore = defineStore('tags-view', () => {
  const visitedViews = ref<TagView[]>(getVisitedViews())

  /** 被缓存的组件 name 列表 */
  const cachedViews = ref<string[]>(getCachedViews())

  function addVisitedView(view: TagView) {
    // temp 临时处理，后续改动菜单实体
    if (view.path?.includes('analysis')) return
    const index = visitedViews.value.findIndex((v) => v.path === view.path)
    if (index !== -1) {
      // 防止 query 参数丢失
      visitedViews.value[index]?.fullPath !== view.fullPath && (visitedViews.value[index] = { ...view })
    } else {
      // 添加新的 visitedView
      visitedViews.value.push({ ...view })
    }
  }

  function addCachedView(view: TagView) {
    if (typeof view.name !== 'string') return
    if (cachedViews.value.includes(view.name)) return
    if (view.meta?.keepAlive) cachedViews.value.push(view.name)
  }

  function delVisitedView(view: TagView) {
    const index = visitedViews.value.findIndex((v) => v.path === view.path)
    if (index !== -1) visitedViews.value.splice(index, 1)
  }

  function delCachedView(view: TagView) {
    if (typeof view.name !== 'string') return
    const index = cachedViews.value.indexOf(view.name)
    if (index !== -1) cachedViews.value.splice(index, 1)
  }

  function delOthersVisitedViews(view: TagView) {
    visitedViews.value = visitedViews.value.filter((v) => v.meta?.affix || v.path === view.path)
  }

  function delOthersCachedViews(view: TagView) {
    if (typeof view.name !== 'string') return
    const index = cachedViews.value.indexOf(view.name)
    cachedViews.value = index !== -1 ? cachedViews.value.slice(index, index + 1) : []
  }

  function delAllVisitedViews() {
    visitedViews.value = visitedViews.value.filter((tag) => tag.meta?.affix)
  }

  function delAllCachedViews() {
    cachedViews.value = []
  }

  function clear() {
    delAllCachedViews()
    delAllVisitedViews()
  }

  // 缓存标签栏数据
  watchEffect(() => {
    setVisitedViews(visitedViews.value)
    setCachedViews(cachedViews.value)
  })

  return {
    visitedViews,
    cachedViews,
    addVisitedView,
    addCachedView,
    delVisitedView,
    delCachedView,
    delOthersVisitedViews,
    delOthersCachedViews,
    delAllVisitedViews,
    delAllCachedViews,
    clear,
  }
})
