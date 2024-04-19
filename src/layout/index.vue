<template>
  <div class="app-container" :class="classes">
    <div class="example-item">
      <h4>默认数据</h4>
      <p>当前设备类型： {{ appStore.device }}</p>
      <p><router-link to="/sadfg">访问404页面</router-link></p>
    </div>

    <div class="example-item">
      <h4>富文本编辑器示例</h4>
      <Editor v-model="ss" />
    </div>

    <div class="example-item">
      <h4>二维码示例</h4>
      <!-- <QrCode text="二维码示例" /> -->
      <button class="bg-sky mr-10px" @click="settingStore.showColorWeakness = true">开启色弱模式 {{ settingStore.showColorWeakness }}</button>
      <button class="bg-sky mr-10px" @click="settingStore.showColorWeakness = false">关闭色弱模式</button>
      <button class="bg-sky mr-10px" @click="settingStore.showGreyMode = true">开启灰色模式 {{ settingStore.showGreyMode }}</button>
      <button class="bg-sky mr-10px" @click="settingStore.showGreyMode = false">关闭灰色模式</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })

/** Layout 布局响应式 */
useResize()

/** 读取 Pinia 仓库 */
const appStore = useApp()
const settingStore = useSetting()

const ss = ref('')

/** 用来添加到根组件的动态类的集合 */
const classes = computed(() => {
  const cls: string[] = [appStore.device]
  return cls
})
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 16px;
}

button {
  --uno-apply: bg-[--app-color-primary];
}

.example-item {
  padding: 8px;
  border-radius: 10px;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
  h4 {
    display: flex;
    align-items: center;
    height: 32px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 16px;
    background-color: rgba(0, 21, 41, 0.08);
    letter-spacing: 2px;
    &::before {
      display: block;
      content: '';
      width: 3px;
      height: 60%;
      margin-left: 8px;
      margin-right: 8px;
      border-radius: 8px;
      background-color: #07f;
    }
  }
  & ~ .example-item {
    margin-top: 16px;
  }
}
</style>
