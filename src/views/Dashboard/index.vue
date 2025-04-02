<template>
  <div class="app-content">
    <div class="list">
      <div class="list-item" v-for="(item, index) in infos" :key="index">
        <div class="list-item__label">{{ item.label }}</div>
        <div class="list-item__value">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
import { getDeviceDpi } from '@/utils'

const browserType = computed(() => navigator.userAgent.match(/(chrome|firefox|safari|opera|msie|trident)/i)?.[0] || '未知')
const browserVersion = computed(() => navigator.userAgent.match(/(version|chrome|firefox|safari|opera|msie|trident)[\/\s]?(\d+(\.\d+)?)/i)?.[2] || '未知')

const infos = ref([
  { label: '系统标题', value: __RUNTIME_CONFIG__.VITE_APP_TITLE },
  { label: '设备 DPI', value: getDeviceDpi() },
  { label: '设备 DPR', value: window.devicePixelRatio || 1 },
  { label: '浏览器', value: `${browserType.value} ${browserVersion.value}` },
  { label: '在线状态', value: navigator.onLine ? '在线' : '离线' },
  { label: '屏幕分辨率', value: `${window.screen.width} × ${window.screen.height}` },
  { label: '可用屏幕区域', value: `${window.screen.availWidth} × ${window.screen.availHeight}` },
  { label: '色彩深度', value: `${window.screen.colorDepth}位` },
  { label: '屏幕方向', value: window.screen?.orientation?.type || '未知' },
  { label: '操作系统', value: navigator.userAgent.match(/(windows|mac os|linux|android|ios|iphone os)/i)?.[0] || '未知' },
  { label: 'CPU核心数', value: navigator.hardwareConcurrency || '未知' },
  { label: '触摸支持', value: 'ontouchstart' in window ? '支持' : '不支持' },
  { label: 'Cookies启用', value: navigator.cookieEnabled ? '启用' : '禁用' },
  { label: '本地存储', value: localStorage ? '支持' : '不支持' },
  { label: '会话存储', value: sessionStorage ? '支持' : '不支持' },
  { label: 'IndexedDB', value: 'indexedDB' in window ? '支持' : '不支持' },
  { label: 'WebGL', value: 'WebGLRenderingContext' in window ? '支持' : '不支持' },
  { label: 'WebWorker', value: 'Worker' in window ? '支持' : '不支持' },
])
</script>

<style lang="scss" scoped>
.list {
  --list-label-text-color: #303133;
  --list-value-text-color: #a8abb2;
  --list-item-height: 42px;
  width: 420px;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--list-item-height);
  padding: 0 16px;
}
.list-item + .list-item {
  border-top: 1px solid #dcdfe6;
}
.list-item__label {
  font-size: 14px;
  font-weight: bold;
  color: var(--list-label-text-color);
}
.list-item__value {
  font-size: 14px;
  color: var(--list-value-text-color);
}
</style>
