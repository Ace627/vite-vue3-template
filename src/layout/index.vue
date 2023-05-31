<template>
  <div class="app-container">
    <h2>Unix时间戳(毫秒)：{{ timestampBy13 }}</h2>
    <h2>Unix时间戳(秒)：{{ timestampBy10 }}</h2>
    <h2>当前时间解析：{{ time }}</h2>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const timestampBy13 = ref(dayjs().valueOf())
const timestampBy10 = ref(dayjs().unix())
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))

setInterval(() => {
  timestampBy13.value = dayjs().valueOf()
  timestampBy10.value = dayjs().unix()
  time.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
}, 1000)
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

h2 {
  text-align: center;
  padding: 16px 0;
}
</style>
