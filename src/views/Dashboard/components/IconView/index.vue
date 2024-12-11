<template>
  <div class="p-16px">
    <a href="https://juejin.cn/post/7447080291569729548" target="_blank" class="link-item">
      <SvgIcon name="External" class="mr-6px" />
      <span>图标使用指南</span>
    </a>

    <AutoWrapList :min-width="120" :gap="0" class="icon-list">
      <div class="icon-item" v-for="(item, i) in iconNameList" :key="i" @click="handleCopy(item)">
        <SvgIcon :name="item" :size="36" />
        <span class="text-14px mt-6px">{{ item }}</span>
      </div>
    </AutoWrapList>
  </div>
</template>

<script setup lang="ts">
import { copyText } from '@/utils/download'

defineOptions({ name: 'IconView' })

const iconNameList = ref<string[]>([])

function handleCopy(name: string) {
  copyText(`<SvgIcon name="${name}" />`)
  alert(`复制成功`)
}

async function loadSvgFiles() {
  const modules: Record<string, any> = import.meta.glob('../../../../assets/svg-icons/*.svg')
  for (const key in modules) {
    const iconName = key.match(/\/([^\/]+)\.svg$/)?.at(1)
    if (!iconName) return
    iconNameList.value.push(iconName)
  }
}

loadSvgFiles()
</script>

<style lang="scss" scoped>
.link-item {
  cursor: pointer;
  display: inline-block;
  margin-bottom: 16px;
  color: var(--ap-color-primary);
  &:hover {
    text-decoration: underline;
  }
}

.icon-list {
  --el-border: 1px solid #dcdfe6;
  --el-transition-duration: 0.3s;
  border-top: var(--el-border);
  border-left: var(--el-border);
  overflow-x: hidden;
  overflow-y: auto;
}
.icon-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 16px 0;
  font-size: 36px;
  border-right: var(--el-border);
  border-bottom: var(--el-border);
  transition: background-color var(--el-transition-duration);
  &__title {
    margin-top: 6px;
    font-size: 14px;
  }
  &:hover {
    color: var(--ap-color-primary);
    background-color: var(--ap-color-primary-light-9);
  }
}
</style>
