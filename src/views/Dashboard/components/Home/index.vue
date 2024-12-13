<template>
  <div class="p-16px">
    <div class="mb-16px text-justify lh-[1.5] c-red fw-bold">
      <div>
        <span>点击左上角 Logo 区域即可返回首页</span>
        <span class="ml-8px cursor-pointer c-[--ap-color-primary] hover:c-[--ap-color-success]" @click="handleLogout">点我模拟退出</span>
      </div>
      <div>如果需要获取此项目的纯净模板，请在 src/views 目录下删除 Dashboard 目录，并将 Dashboard_back 目录重命名为 Dashboard</div>
    </div>

    <div class="card">
      <AutoWrapList :min-width="100" :gap="0">
        <div class="nav-item" v-for="(item, index) in list" :key="index" @click="emits('changeView', item.name)">
          <!-- <SvgIcon name="Key" color="#f00" /> -->
          <div class="fw-bold ml-6px tracking-wider">{{ item.title }}</div>
        </div>
      </AutoWrapList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CacheService } from '@/utils/cache/cache.service'

defineOptions({ name: 'Home' })

/** 接收父组件传递的事件 */
const emits = defineEmits<{
  (event: 'changeView', name: string): void
}>()

const userStore = useUserStore()

const list = ref([
  { name: 'IconView', title: '图标' },
  { name: 'TaiChi', title: '太极图' },
  { name: 'Editor', title: '富文本' },
  { name: 'MdEditor', title: 'Markdown' },
  { name: 'WrapList', title: '换行列表' },
])

async function handleLogout() {
  const data = window.confirm(`确定注销并退出系统吗？`)
  if (!data) return
  await userStore.logout()
  CacheService.local.remove('ACTIVE_VIEW')
  window.location.reload()
}
</script>

<style lang="scss" scoped>
.card {
  padding: 16px;
  background-color: #fff;
  border: 1px solid #edf0f2;
  border-radius: 6px;
  box-shadow: 0px 1px 10px 0px #00000026;
}

.auto-wrap-list {
  border-top: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
}

.nav-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  // font-size: 36px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  transition: background-color var(--el-transition-duration);
  &:hover {
    color: var(--ap-color-primary);
    background-color: var(--ap-color-primary-light-9);
  }
}
</style>
