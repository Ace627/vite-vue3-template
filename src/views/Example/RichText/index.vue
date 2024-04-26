<template>
  <div class="app-content">
    <div class="tips bg-amber p-10px b-rd-8px">图片与视频暂未联动服务器，不过预留了自定义上传的方法，具体参考 README.md 文件</div>

    <Editor v-model="content" class="mt-16px mb-16px" mode="default" />

    <main class="bg-slate c-white p-10px b-rd-10px">
      <div v-dompurify-html="content"></div>
    </main>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'RichText' })

const content = ref<string>('一曲肝肠断，天涯何处觅知音。')
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
