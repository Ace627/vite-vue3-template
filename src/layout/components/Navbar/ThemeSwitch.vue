<template>
  <div @click="toggleTheme">
    <SvgIcon :name="isDark ? 'Moon' : 'Sunny'" size="1.16em" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ThemeSwitch' })

const { isDark, toggleTheme } = useTheme()
</script>

<style lang="scss" scoped></style>
