import { getCachedViews, getVisitedViews, setCachedViews, setVisitedViews, type TagView } from '@/utils'

export const useTagsViewStore = defineStore('tags-view', () => {
  /** 已访问（展示中）的页签列表，含固定页与普通页 */
  const visitedViews = ref<TagView[]>(getVisitedViews())

  /** 被 KeepAlive 缓存的组件 name 列表（仅 keepAlive 页才会入列） */
  const cachedViews = ref<string[]>(getCachedViews())

  /** 新增/更新一个页签：已存在则同步最新 fullPath（防 query 丢失），否则追加 */
  function addVisitedView(view: TagView) {
    const index = visitedViews.value.findIndex((v) => v.path === view.path)
    if (index !== -1) {
      // 防止 query 参数丢失
      visitedViews.value[index]?.fullPath !== view.fullPath && (visitedViews.value[index] = { ...view })
    } else {
      // 添加新的 visitedView
      visitedViews.value.push({ ...view })
    }
  }

  /** 仅当页签声明了 keepAlive 且尚未缓存时，将其组件 name 加入缓存列表 */
  function addCachedView(view: TagView) {
    if (typeof view.name !== 'string') return
    if (cachedViews.value.includes(view.name)) return
    if (view.meta?.keepAlive) cachedViews.value.push(view.name)
  }

  /** 按 path 移除一个页签（不处理缓存，缓存由 delCachedView 单独清理） */
  function delVisitedView(view: TagView) {
    const index = visitedViews.value.findIndex((v) => v.path === view.path)
    if (index !== -1) visitedViews.value.splice(index, 1)
  }

  /** 按组件 name 移除一条缓存 */
  function delCachedView(view: TagView) {
    if (typeof view.name !== 'string') return
    const index = cachedViews.value.indexOf(view.name)
    if (index !== -1) cachedViews.value.splice(index, 1)
  }

  /** 关闭其他：保留固定页 + 当前页，其余页签移除 */
  function delOthersVisitedViews(view: TagView) {
    visitedViews.value = visitedViews.value.filter((v) => v.meta?.affix || v.path === view.path)
  }

  /** 关闭其他：仅保留固定页与当前页对应的组件缓存，其余缓存移除 */
  function delOthersCachedViews(view: TagView) {
    const keepNames = visitedViews.value
      .filter((v) => v.meta?.affix || v.path === view.path)
      .map((v) => v.name)
      .filter((n): n is string => typeof n === 'string')
    cachedViews.value = cachedViews.value.filter((name) => keepNames.includes(name))
  }

  /** 关闭右侧：保留固定页 + 当前页及其左侧，移除右侧普通页，并同步清理这些页的缓存 */
  function delRightTags(view: TagView) {
    const index = visitedViews.value.findIndex((v) => v.path === view.path)
    if (index === -1) return
    const removedNames = visitedViews.value
      .filter((v, i) => i > index && !v.meta?.affix && typeof v.name === 'string')
      .map((v) => v.name as string)
    visitedViews.value = visitedViews.value.filter((v, i) => v.meta?.affix || i <= index)
    cachedViews.value = cachedViews.value.filter((name) => !removedNames.includes(name))
  }

  /** 关闭左侧：保留固定页 + 当前页及其右侧，移除左侧普通页，并同步清理这些页的缓存 */
  function delLeftTags(view: TagView) {
    const index = visitedViews.value.findIndex((v) => v.path === view.path)
    if (index === -1) return
    const removedNames = visitedViews.value
      .filter((v, i) => i < index && !v.meta?.affix && typeof v.name === 'string')
      .map((v) => v.name as string)
    visitedViews.value = visitedViews.value.filter((v, i) => v.meta?.affix || i >= index)
    cachedViews.value = cachedViews.value.filter((name) => !removedNames.includes(name))
  }

  /** 关闭全部：仅保留固定页 */
  function delAllVisitedViews() {
    visitedViews.value = visitedViews.value.filter((tag) => tag.meta?.affix)
  }

  /** 清空缓存：仅保留固定页对应的组件缓存，普通页缓存一并移除 */
  function delAllCachedViews() {
    const affixNames = visitedViews.value
      .filter((v) => v.meta?.affix && typeof v.name === 'string')
      .map((v) => v.name as string)
    cachedViews.value = cachedViews.value.filter((name) => affixNames.includes(name))
  }

  /** 重置整个页签栏（visited + cached），登出时调用 */
  function clear() {
    delAllCachedViews()
    delAllVisitedViews()
  }

  // 标签栏数据变化时持久化到本地缓存，刷新后恢复
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
    delRightTags,
    delLeftTags,
    delAllVisitedViews,
    delAllCachedViews,
    clear,
  }
})
