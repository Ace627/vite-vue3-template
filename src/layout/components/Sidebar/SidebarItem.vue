<template>
  <template v-if="!item?.meta?.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item?.meta?.alwaysShow">
      <el-menu-item :index="resolvePath(onlyOneChild.path)" @click="handleMenuItemClick(onlyOneChild)">
        <SvgIcon class="sidebar-icon" :name="onlyOneChild.meta?.icon ?? item.meta?.icon ?? 'Key'" />
        <template #title>
          <span class="menu-title" :title="hasTitle(onlyOneChild.meta?.title)">{{ onlyOneChild.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <el-sub-menu v-else :index="resolvePath(item.path)" teleported>
      <template #title>
        <SvgIcon class="sidebar-icon" :name="item.meta?.icon ?? 'Key'" />
        <span class="menu-title" :title="hasTitle(item.meta?.title)">{{ item.meta?.title }}</span>
      </template>
      <SidebarItem v-for="(child, index) in item.children" :key="child.path + index" :item="child" :basePath="resolvePath(child.path)" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
defineOptions({ name: 'SidebarItem' })
import { router } from '@/router'
import { isExternal } from '@/utils'
import type { RouteRecordRaw } from 'vue-router'

interface OneChild {
  path: string
  meta?: { title?: string; icon?: string }
  children?: RouteRecordRaw[]
  noShowingChildren?: boolean
  hidden?: boolean
}

const props = defineProps({
  item: { type: Object as PropType<RouteRecordRaw>, required: true },
  basePath: { type: String, default: '' },
})

const onlyOneChild = ref<OneChild>({ path: '' })

function hasOneShowingChild(children: RouteRecordRaw[] = [], parent: RouteRecordRaw): boolean {
  const showingChildren = children.filter((item) => {
    if (item.meta?.hidden) {
      return false
    }
    onlyOneChild.value = item as OneChild
    return true
  })

  if (showingChildren.length === 1) {
    return true
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true } as OneChild
    return true
  }

  return false
}

function hasTitle(title?: string): string {
  if (title && title.length > 5) {
    return title
  }
  return ''
}

function resolvePath(routePath: string): string {
  if (isExternal(routePath)) return routePath
  if (isExternal(props.basePath)) return props.basePath
  return normalizePath(props.basePath + '/' + routePath)
}

function normalizePath(path: string): string {
  return path ? path.replace(/\/+/g, '/').replace(/\/$/, '') : path
}

/** 处理菜单项点击事件，根据路径打开新窗口或跳转路由。 */
function handleMenuItemClick(item: OneChild) {
  const path: string = resolvePath(item.path)
  if (isExternal(path)) return window.open(path, '_blank', 'noopener')
  router.push(path)
}
</script>

<style lang="scss" scoped>
.sidebar-icon {
  font-size: var(--el-sidebar-icon-size);
  margin-right: 8px;
  transition: margin-right var(--el-transition-duration);
}
.el-menu--collapse .sidebar-icon {
  margin-right: 0;
}

:deep(.el-sub-menu__title) {
  font-size: var(--el-sidebar-font-size);
}

/* 带 deep 的是对 sub-menu 下的 menu-item 起效 */
.el-menu-item,
:deep(.el-menu-item) {
  color: var(--el-sidebar-text-color);
  font-size: var(--el-sidebar-font-size);
  &:hover {
    color: var(--el-sidebar-hover-text-color);
    background-color: var(--el-sidebar-hover-bg-color);
  }
  &.is-active {
    color: var(--el-sidebar-active-text-color);
    background-color: var(--el-sidebar-active-bg-color);
  }
}
</style>
