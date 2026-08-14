<template>
  <div @click="toggleTheme">
    <SvgIcon :name="settingStore.isDark ? 'Moon' : 'Sunny'" size="1.16em" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ThemeSwitch' })

const { toggleTheme } = useTheme()
const settingStore = useSettingStore()
</script>

<style lang="scss" scoped></style>
