<template>
  <div class="tags-view-container flex items-center">
    <div class="action-item action-item--left" :class="{ 'is-disabled': !canScrollLeft }" @click="scrollLeft">
      <SvgIcon name="ArrowLeft" />
    </div>

    <el-scrollbar wrap-class="flex items-center" class="flex-1" ref="scrollbarRef">
      <div class="tags-view-wrapper">
        <router-link
          @dragstart.prevent
          class="tags-view-item flex-center"
          :class="{ 'is-active': isActive(tag), 'show-tag-icon': settingStore.showTagsViewIcon }"
          :to="{ path: tag.path, query: tag.query }"
          v-for="tag in tagsViewStore.visitedViews"
          :key="tag.path"
          @contextmenu.prevent="openMenu(tag, $event)"
        >
          <SvgIcon :name="tag.meta.icon" v-if="settingStore.showTagsViewIcon && tag.meta && tag.meta.icon" />
          <span>{{ tag.meta?.title }}</span>
          <SvgIcon name="Close" class="close-icon" v-if="!isAffix(tag)" size="1.2em" @click.prevent.stop="closeSelectedTag(tag)" />
        </router-link>
      </div>
    </el-scrollbar>

    <div class="action-item action-item--right" :class="{ 'is-disabled': !canScrollRight }" @click="scrollRight">
      <SvgIcon name="ArrowRight" />
    </div>
    <div class="action-item" @click="refreshSelectedTag(selectedDropdownTag)">
      <SvgIcon name="Refresh" />
    </div>

    <ul v-show="visible" class="contextmenu" :style="{ left: `${left}px`, top: `${top}px` }">
      <li @click="refreshSelectedTag(activeTag)">
        <SvgIcon name="Refresh" size="1.2em" class="mr-4px" />
        <span>刷新当前</span>
      </li>
      <li @click="closeSelectedTag(activeTag)" v-if="!isAffix(activeTag)">
        <SvgIcon name="Close" size="1.2em" class="mr-4px" />
        <span>关闭当前</span>
      </li>
      <li @click="closeOthersTags">
        <SvgIcon name="Close" size="1.2em" class="mr-4px" />
        <span>关闭其它</span>
      </li>
      <li @click="closeAllTags(activeTag)">
        <SvgIcon name="Close" size="1.2em" class="mr-4px" />
        <span>关闭所有</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'TagsView' })
import { type TagView } from '@/utils'
import type { RouteRecordRaw } from 'vue-router'
import { resolvePath } from '@/router/router.helper'
import { RouterConstant } from '@/router/router.constant'

const route = useRoute()
const router = useRouter()
const settingStore = useSettingStore()
const tagsViewStore = useTagsViewStore()
const permissionStore = usePermissionStore()
const scrollbarRef = useTemplateRef('scrollbarRef')

/** 活动的标签页 */
const activeTag = ref<TagView>({})
/** 给右箭头右边的刷新和下拉菜单用的刷新标签页 */
const selectedDropdownTag = computed(() => tagsViewStore.visitedViews.find((view) => isActive(view)) || {})

/** 右键菜单的状态 */
const visible = ref(false)

/** 右键菜单的 top 位置 */
const top = ref(0)

/** 右键菜单的 left 位置 */
const left = ref(0)

/** 固定的标签页 */
let affixTags: TagView[] = []

const canScrollLeft = ref(false)
const canScrollRight = ref(false)

async function updateScrollState() {
  await nextTick()
  const wrap = scrollbarRef.value?.wrapRef
  if (!wrap) return
  canScrollLeft.value = wrap.scrollLeft > 0
  canScrollRight.value = wrap.scrollLeft < wrap.scrollWidth - wrap.clientWidth - 1
}

/** 滚动到左侧 */
function scrollLeft() {
  const wrap = scrollbarRef.value?.wrapRef
  if (!wrap || !canScrollLeft.value) return
  wrap.scrollBy({ left: -320, behavior: 'smooth' })
}

/** 滚动到右侧 */
function scrollRight() {
  const wrap = scrollbarRef.value?.wrapRef
  if (!wrap || !canScrollRight.value) return
  wrap.scrollBy({ left: 320, behavior: 'smooth' })
}

/** 将当前激活的标签滚动到可视区域 */
async function scrollToActiveTag() {
  await nextTick()
  const wrap = scrollbarRef.value?.wrapRef
  if (!wrap) return
  const activeTagEl = wrap.querySelector('.tags-view-item.is-active') as HTMLElement
  if (!activeTagEl) return
  const tagLeft = activeTagEl.offsetLeft
  const tagRight = tagLeft + activeTagEl.offsetWidth
  const viewLeft = wrap.scrollLeft
  const viewRight = wrap.scrollLeft + wrap.clientWidth
  if (tagLeft < viewLeft) {
    wrap.scrollTo({ left: tagLeft, behavior: 'smooth' })
  } else if (tagRight > viewRight) {
    wrap.scrollTo({ left: tagRight - wrap.clientWidth, behavior: 'smooth' })
  }
}

/** 判断标签页是否固定 */
function isAffix(tag: TagView): boolean {
  return Boolean(tag.meta && tag.meta.affix)
}

/** 判断标签页是否激活 */
function isActive(tag: TagView): boolean {
  return tag.path === route.path
}

/** 筛选出固定标签页 */
function filterAffixTags(routes: RouteRecordRaw[], basePath = '/') {
  let tags: TagView[] = []
  for (const route of routes) {
    if (route.meta && route.meta.affix) {
      const tagPath = resolvePath(route.path, basePath)
      tags.push({ fullPath: tagPath, path: tagPath, name: route.name, meta: { ...route.meta } })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) tags = [...tags, ...tempTags]
    }
  }
  return tags
}

/** 初始化标签页 */
function initTags() {
  affixTags = filterAffixTags(permissionStore.sidebarRoutes)
  for (const tag of affixTags) {
    if (!tag.name) continue
    tagsViewStore.addVisitedView(tag)
    tagsViewStore.addCachedView(tag)
  }
}

/** 跳转到最后一个标签页 */
function toLastView(visitedViews: TagView[], view: TagView) {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView && latestView.fullPath) return router.push(latestView.fullPath!)
  if (view.path === RouterConstant.HOME_PAGE_URL) return router.replace({ path: RouterConstant.REDIRECT_PAGE_URL + view.path })
  router.push(RouterConstant.HOME_PAGE_URL)
}

/** 添加标签页 */
function addTags() {
  const routeName = route.name
  if (!routeName) return
  tagsViewStore.addVisitedView(route)
  tagsViewStore.addCachedView(route)
}

/** 关闭当前正在右键操作的标签页 */
function closeSelectedTag(tag: TagView) {
  tagsViewStore.delVisitedView(tag)
  tagsViewStore.delCachedView(tag)
  if (isActive(tag)) toLastView(tagsViewStore.visitedViews, tag)
}

/** 刷新当前正在右键操作的标签页 */
function refreshSelectedTag(view: TagView) {
  tagsViewStore.delCachedView(view)
  router.replace({ path: RouterConstant.REDIRECT_PAGE_URL + view.path, query: view.query })
}
/** 关闭其他标签页 */
function closeOthersTags() {
  const fullPath = activeTag.value.fullPath
  if (fullPath && fullPath !== route.path) router.push(fullPath)
  tagsViewStore.delOthersVisitedViews(activeTag.value)
  tagsViewStore.delOthersCachedViews(activeTag.value)
}

/** 关闭所有标签页 */
function closeAllTags(view: TagView) {
  tagsViewStore.delAllVisitedViews()
  tagsViewStore.delAllCachedViews()
  if (affixTags.some((tag) => tag.path === route.path)) return
  toLastView(tagsViewStore.visitedViews, view)
}

/** 打开右键菜单面板 */
function openMenu(tag: TagView, event: MouseEvent) {
  const menuMinWidth = 100
  // 当前页面宽度
  const offsetWidth = document.body.offsetWidth
  // 面板的最大左边距
  const maxLeft = offsetWidth - menuMinWidth
  // 面板距离鼠标指针的距离
  const left15 = event.clientX + 10
  left.value = left15 > maxLeft ? maxLeft : left15
  top.value = event.clientY
  visible.value = true
  // 更新当前正在右键操作的标签页
  activeTag.value = tag
}

/** 关闭右键菜单面板 */
function closeMenu() {
  visible.value = false
}

watch(visible, (value) => (value ? document.body.addEventListener('click', closeMenu) : document.body.removeEventListener('click', closeMenu)))

function handleScroll() {
  updateScrollState()
}

onMounted(async () => {
  initTags()
  addTags()
  await nextTick()
  await updateScrollState()
  await scrollToActiveTag()
  scrollbarRef.value?.wrapRef?.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  scrollbarRef.value?.wrapRef?.removeEventListener('scroll', handleScroll)
})

watch(
  () => route.path,
  () => {
    addTags()
    scrollToActiveTag()
    updateScrollState()
  },
)

watch(
  () => tagsViewStore.visitedViews,
  () => updateScrollState(),
  { deep: true },
)
</script>

<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  height: var(--el-tags-view-height);
  background-color: var(--el-tags-view-bg-color);
  border-bottom: 1px solid var(--el-tags-view-border-color);
  box-shadow: var(--el-tags-view-box-shadow);
}

.action-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 100%;
  border-left: 1px solid var(--el-border-color-darker);
  transition: background-color var(--el-transition-duration-fast);
  &--left {
    border-left: none;
    border-right: 1px solid var(--el-border-color-darker);
  }
  &:hover {
    background-color: var(--el-fill-color);
  }
}
.action-item.is-disabled {
  cursor: not-allowed;
  opacity: 0.4;
  background-color: transparent;
}

.tags-view-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 100%;
  padding: 0 8px;
}

.tags-view-item {
  user-select: none;
  cursor: pointer;
  gap: 4px;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  border: 1px solid var(--el-border-color);
}
.tags-view-item:hover {
  color: var(--el-color-primary);
}
.tags-view-item.is-active {
  color: #fff;
  border-color: var(--el-color-primary-light-3);
  background-color: var(--el-color-primary);
}
.tags-view-item.is-active.show-tag-icon::before {
  display: none;
}
.tags-view-item.is-active::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
}
.svg-icon {
  border-radius: 50%;
  transition: all var(--el-transition-duration-fast);
}
.svg-icon.close-icon:hover {
  color: #fff;
  background-color: var(--el-color-danger);
}

/* 右键菜单 */
.contextmenu {
  position: fixed;
  z-index: 2025;
  padding: 6px 0;
  font-size: 12px;
  border-radius: 4px;
  color: var(--el-text-color-primary);
  background-color: var(--el-bg-color);
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    cursor: pointer;
    padding: 8px 16px;
    transition: all var(--el-transition-duration-fast);
    &:hover {
      background-color: var(--el-fill-color);
    }
  }
}
</style>
