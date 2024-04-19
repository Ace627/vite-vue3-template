<template>
  <RouterView />
</template>

<script setup lang="ts">
defineOptions({ name: 'App' })

/** 读取 Pinia 仓库 */
const settingStore = useSetting()

/** 监听色值变量自动切换色彩模式 */
watchEffect(() => {
  const classes = ['showGreyMode', 'showColorWeakness']
  const rootClassList = document.documentElement.classList
  classes.forEach((className) => rootClassList.contains(className) && rootClassList.remove(className))
  if (settingStore.showGreyMode) rootClassList.add('showGreyMode')
  if (settingStore.showColorWeakness) rootClassList.add('showColorWeakness')
})
</script>

<style lang="scss" scoped></style>
