<template>
  <el-breadcrumb>
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <div v-if="item.noRedirect || index === breadcrumbs.length - 1" class="no-redirect breadcrumb-item">
          <SvgIcon :name="item.icon" v-if="showBreadcrumbIcon" />
          <span>{{ item.title }}</span>
        </div>
        <div v-else @click.prevent="handleLink(item)" class="breadcrumb-item font-bold">
          <SvgIcon :name="item.icon" v-if="showBreadcrumbIcon" />
          <span>{{ item.title }}</span>
        </div>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
defineOptions({ name: 'Breadcrumb' })
import { RouterConstant } from '@/router/router.constant'

const route = useRoute()
const router = useRouter()
const settingStore = useSettingStore()

const showBreadcrumbIcon = computed(() => settingStore.showBreadcrumbIcon)

/** 面包屑项数据结构 */
interface BreadcrumbItem {
  path: string
  title: string
  icon: string
  redirect?: string
  noRedirect?: boolean
}

/** 面包屑列表 */
const breadcrumbs = ref<BreadcrumbItem[]>([])

/** 获取首页路由配置 */
function getDashboard(): BreadcrumbItem {
  const matched = router.resolve(RouterConstant.HOME_PAGE_URL)
  const title = (matched.meta.title as string) ?? '首页'
  const icon = (matched.meta.icon as string) ?? 'Home'
  return { path: RouterConstant.HOME_PAGE_URL, title, icon }
}

/** 提取面包屑数据 */
function getBreadcrumb() {
  // 从 route.matched 中提炼出面包屑所需的数据（path、title、redirect）
  breadcrumbs.value = route.matched
    .filter((item) => item.meta?.title && item.meta?.breadcrumb !== false)
    .map((item) => ({
      path: item.path,
      title: item.meta.title!,
      icon: item.meta.icon || 'Key',
      redirect: item.redirect as string,
      noRedirect: item.redirect === '/404',
    }))
  // 如果第一个不是首页，则在开头添加首页
  if (breadcrumbs.value[0]?.path !== RouterConstant.HOME_PAGE_URL) breadcrumbs.value.unshift(getDashboard())
}

/** 处理面包屑点击事件 */
function handleLink(item: BreadcrumbItem) {
  // 有 redirect 直接跳转 redirect
  if (item.redirect) return router.push({ path: item.redirect })
  // 否则跳转到当前路径
  router.push(item.path)
}

// 监听路由变化，更新面包屑
watch(
  () => route.path,
  () => {
    // 重定向页面不需要更新面包屑
    if (route.path.startsWith(RouterConstant.REDIRECT_PAGE_URL)) return
    getBreadcrumb()
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  line-height: 1;
  .no-redirect {
    color: var(--el-text-color-placeholder);
  }
  a {
    font-weight: bold;
  }
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}
.breadcrumb-item:not(.no-redirect):hover {
  cursor: pointer;
  color: var(--el-color-primary);
}
</style>
