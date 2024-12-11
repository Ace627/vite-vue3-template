<template>
  <div class="app-content text-center text-16px flex-col flex items-center">
    <ApTaiChi size="32vmin" class="mb-16px" />
    <div class="fw-bold">模板已稳定运行</div>
    <div class="mt-10px c-#07f">{{ diffTime }}</div>

    <SvgIcon name="Search" :size="88" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })

const diffTime = ref<string>()

function addZero(count: number) {
  return count.toString().padStart(2, '0')
}

function formatTime(milliseconds: number): string {
  const day = Math.floor(milliseconds / (1000 * 60 * 60 * 24))
  const hour = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minute = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
  const second = Math.floor((milliseconds % (1000 * 60)) / 1000)
  return `${addZero(day)}天${addZero(hour)}时${addZero(minute)}分${addZero(second)}秒`
}

function getDiffTimestamp() {
  diffTime.value = formatTime(Date.now() - new Date(`2023-09-27 14:50:54`).getTime())
  window.requestAnimationFrame(getDiffTimestamp)
}
getDiffTimestamp()
</script>

<style lang="scss" scoped></style>
