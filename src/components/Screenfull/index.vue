<template>
  <!-- <div class="screenfull-container" @click="toggleFullScreen">
    <el-tooltip effect="dark" :content="tips" placement="bottom">
      <SvgIcon :name="iconName" :size />
    </el-tooltip>
  </div> -->
  <div class="screenfull-container flex-center" @click="toggleFullScreen" :title="tips">
    <SvgIcon :name="iconName" :size />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Screenfull' })

const props = defineProps({
  /** 全屏的元素，默认是 html */
  element: { type: HTMLElement, default: document.documentElement },
  /** 打开全屏提示语 */
  openTips: { type: String, default: '全屏' },
  /** 关闭全屏提示语 */
  exitTips: { type: String, default: '退出全屏' },
  /** 图标的大小，size x size */
  size: { type: [String, Number], default: '1em' },
})

const { isFullscreen, isSupported, toggle } = useFullscreen(props.element)

const tips = ref<string>(props.openTips)
const iconName = computed(() => (isFullscreen.value ? 'ExitFullScreen' : 'FullScreen'))

function toggleFullScreen() {
  // if (!isSupported) return useModal().msgWarning('您的浏览器暂不支持全屏效果')
  if (!isSupported) return alert('您的浏览器暂不支持全屏效果')
  toggle()
}
</script>

<style lang="scss" scoped></style>
