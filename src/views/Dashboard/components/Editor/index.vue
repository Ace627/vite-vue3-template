<template>
  <div class="app-content flex flex-col h-full">
    <div class="mb-16px flex items-center">
      <div class="btn-animate btn-animate__ripple" @click="downText">
        <span class="btn-animate__ripple-decoration"></span>
        下载 TXT
      </div>

      <div class="btn-animate btn-animate__ripple ml-16px" @click="downHTML">
        <span class="btn-animate__ripple-decoration"></span>
        下载 HTML
      </div>
    </div>

    <RichEditor v-model="content" height="100%" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Editor' })
import { linkDownload } from '@/utils/download'

const content = ref<string>('你用什么吸引人，吸引到的就是什么人。')

function downText() {
  const blob = new Blob([content.value], { type: 'text/plain' })
  linkDownload(blob, `富文本内容.txt`)
}
function downHTML() {
  const blob = new Blob([content.value], { type: 'text/html' })
  linkDownload(blob, `富文本内容.html`)
}
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
