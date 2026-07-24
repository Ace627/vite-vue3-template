<template>
  <div @click="toggleTheme">
    <SvgIcon :name="isDark ? 'Moon' : 'Sunny'" size="1.16em" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ThemeSwitch' })

const settingStore = useSettingStore()
const isDark = computed(() => settingStore.theme === 'dark')

async function toggleTheme(event: MouseEvent) {
  const { clientX, clientY } = event
  const transition = document.startViewTransition(() => {
    settingStore.theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', isDark.value)
  })
  await transition.ready
  const innerWidth = window.innerWidth
  const innerHeight = window.innerHeight
  const radius = Math.hypot(Math.max(clientX, 0, innerWidth - clientX), Math.max(clientY, 0, innerHeight - clientY))
  const clipPath = [`circle(0px at ${clientX}px ${clientY}px)`, `circle(${radius}px at ${clientX}px ${clientY}px)`]
  const pseudoElement = isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)'
  const easing = 'cubic-bezier(0.28, 0, 0.44, 1)' // 苹果风格
  document.documentElement.animate({ clipPath: isDark.value ? clipPath.reverse() : clipPath }, { duration: 500, fill: 'both', easing, pseudoElement })
  await nextTick()
  settingStore.saveSetting({ showTip: false })
}

if (isDark.value) document.documentElement.classList.add('dark')
</script>

<style lang="scss" scoped></style>
