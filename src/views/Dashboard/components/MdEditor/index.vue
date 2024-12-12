<template>
  <div class="h-full flex flex-col p-16px">
    <div class="mb-16px flex items-center">
      <div class="btn-animate btn-animate__ripple ml-16px" @click="downHTML">
        <span class="btn-animate__ripple-decoration"></span>
        下载 HTML
      </div>

      <div class="btn-animate btn-animate__ripple ml-16px" @click="downMarkdown">
        <span class="btn-animate__ripple-decoration"></span>
        下载 Markdown
      </div>

      <div class="btn-animate btn-animate__ripple ml-16px" @click="downText">
        <span class="btn-animate__ripple-decoration"></span>
        下载 TXT
      </div>
    </div>

    <Markdown v-model="markdownContent" :sanitize="(html:string) => (htmlContent = html)" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MdEditor' })
import { linkDownload } from '@/utils/download'
import readme from '../../../../../README.md?raw'

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
  position: relative;
  width: 130px;
  height: 40px;
  line-height: 40px;
  border: none;
  border-radius: 5px;
  background: var(--ap-color-primary);
  color: #fff;
  text-align: center;
}

@keyframes anim-out {
  0% {
    width: 0%;
    background: rgba(0, 0, 0, 0.3);
  }
  100% {
    width: 100%;
    background: transparent;
  }
}

.btn-animate__ripple {
  overflow: hidden;

  &::after {
    content: '';
    transform: translateY(-50%) translateX(-50%);
    position: absolute;
    width: 0;
    height: 200%;
    top: 50%;
    left: 50%;
  }

  &:hover {
    &::after {
      animation: anim-out 0.75s;
    }
  }
}
</style>
