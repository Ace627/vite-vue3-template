<template>
  <div class="app-content">
    <div class="tips mb-16px bg-amber p-10px b-rd-8px">图片与视频暂未联动服务器，不过预留了自定义上传的方法，具体参考 README.md 文件</div>
    <Editor v-model="content" class="mb-16px" />
    <div class="flex-center">
      <button @click="printContent">打印内容</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'RichText' })

const content = ref<string>()

function printContent() {
  console.log(content.value)
}
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  color: var(--app-color-white);
  background-color: var(--app-color-primary);
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.16s;
  &:hover {
    opacity: 0.76;
  }
}
</style>
