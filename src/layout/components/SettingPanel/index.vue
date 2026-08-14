<template>
  <el-drawer v-model="settingStore.showSetting" append-to-body :with-header="false" size="280px">
    <div class="setting-container">
      <h3 class="drawer-title">系统布局配置</h3>

      <div class="drawer-item" v-for="(item, index) in items" :key="index">
        <span>{{ item.label }}</span>
        <template v-if="item.type === 'switch'">
          <el-switch v-model="settingStore[item.prop]" />
        </template>
        <template v-else-if="item.type === 'select'">
          <el-select v-model="settingStore[item.prop]" size="small" :options="item.options"> </el-select>
        </template>
      </div>

      <el-divider class="my-16px!" />

      <div class="flex-center">
        <el-button plain type="danger" @click="settingStore.resetSetting">
          <template #icon> <SvgIcon name="Refresh" /> </template>
          <span>重置配置</span>
        </el-button>
        <el-button plain type="primary" @click="settingStore.saveSetting()">
          <template #icon> <SvgIcon name="Save" /> </template>
          <span>保存配置</span>
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
defineOptions({ name: 'SettingPanel' })
import type { SystemSetting } from '@/defaultSettings'

const settingStore = useSettingStore()

const TRANSITION_OPTIONS = [
  { label: '淡入淡出', value: 'el-fade-in' },
  { label: '顶部缩放', value: 'el-zoom-in-top' },
  { label: '渐变过渡', value: 'fade-transform' },
  { label: '底部缩放', value: 'el-zoom-in-bottom' },
  { label: '线性淡入', value: 'el-fade-in-linear' },
  { label: '中心缩放', value: 'el-zoom-in-center' },
]

interface SettingItem {
  type: 'switch' | 'select'
  label: string
  prop: keyof SystemSetting
  options?: { label: string; value: any }[]
}

const items: SettingItem[] = [
  { type: 'switch', label: '动态标题', prop: 'showDynamicTitle' },
  { type: 'switch', label: '显示 Logo', prop: 'showLogo' },
  { type: 'switch', label: '手风琴菜单', prop: 'uniqueOpened' },
  { type: 'switch', label: '系统水印', prop: 'showWatermark' },
  { type: 'switch', label: '面包屑导航', prop: 'showBreadcrumb' },
  { type: 'switch', label: '面包屑图标', prop: 'showBreadcrumbIcon' },
  { type: 'switch', label: '多标签模式', prop: 'showTagsView' },
  { type: 'switch', label: '显示页签图标', prop: 'showTagsViewIcon' },
  { type: 'select', label: '页面转场动效', prop: 'transition', options: TRANSITION_OPTIONS },
]
</script>

<style lang="scss" scoped>
.setting-container {
  .drawer-title {
    margin: 0;
    margin-bottom: 10px;
    padding: 8px 0 8px 8px;
    border-radius: 4px;
    border-left: 3px solid var(--el-color-primary);
    background-image: linear-gradient(to right, var(--el-bg-color-page) 72%, var(--el-drawer-bg-color) 100%);
  }

  .drawer-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 8px;
    font-size: var(--el-font-size-base);
    color: var(--el-color-info);
  }
  .drawer-item + .drawer-item {
    margin-top: 8px;
  }
}

:deep(.el-select) {
  --el-select-width: 136px;
}
</style>
