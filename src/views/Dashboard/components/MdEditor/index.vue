<template>
  <div class="h-full flex flex-col p-16px">
    <div class="mb-16px flex items-center">
      <div class="btn-animate btn-animate__skew ml-16px" @click="downHTML">下载 HTML</div>

      <div class="btn-animate btn-animate__skew ml-16px" @click="downMarkdown">下载 Markdown</div>

      <div class="btn-animate btn-animate__skew ml-16px" @click="downText">下载 TXT</div>
    </div>

    <Markdown v-model="markdownContent" :sanitize="(html:string) => (htmlContent = html)" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MdEditor' })
import readme from '../../../../../README.md?raw'
import { linkDownload } from '@/utils/lodash-added'

const markdownContent = ref('**仰天大笑出门去，我辈岂是蓬蒿人。**')
const htmlContent = ref<string>('')

function downText() {
  const blob = new Blob([markdownContent.value], { type: 'text/plain' })
  linkDownload(blob, `Markdown.txt`)
}

function downHTML() {
  const blob = new Blob([htmlContent.value], { type: 'text/html' })
  linkDownload(blob, `Markdown.html`)
}

function downMarkdown() {
  const blob = new Blob([markdownContent.value], { type: 'text/markdown' })
  linkDownload(blob, `Markdown.md`)
}

onMounted(() => {
  markdownContent.value = readme
})
</script>

<style lang="scss" scoped>
.btn-animate {
  cursor: pointer;
  position: relative;
  width: 130px;
  height: 40px;
  line-height: 40px;
  border: none;
  border-radius: 5px;
  background: #027efb;
  color: #fff;
  text-align: center;
}

.btn-animate__skew {
  background: transparent;
  overflow: hidden;
  z-index: 1;

  &::after {
    position: absolute;
    content: ' ';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: #027efb;
    transition: all 0.32s ease;
  }

  &:hover {
    &::after {
      transform: scale(2) rotate(180deg);
    }
  }
}
</style>
