<template>
  <div class="app-content">
    <div class="mb-16px fw-bold text-20px c-sky tracking-widest">
      <div>此处的文件下载实例皆由前端实现，不涉及到后端处理</div>
    </div>

    <AutoWrapList :min-width="140">
      <div class="btn" @click="downText">下载 TEXT</div>
      <div class="btn" @click="downHtml">下载 HTML</div>
      <div class="btn" @click="downJson">下载 JSON</div>
      <div class="btn" @click="downImage">下载 Image</div>
      <div class="btn" @click="handleCopyText">复制 TEXT</div>
    </AutoWrapList>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Download' })
import jsonContent from './json-example.json'
import { copyText, linkDownload } from '@/utils/lodash-added'

async function downText() {
  const fileURL = new URL('./txt-example.txt', import.meta.url).href
  const reposne = await fetch(fileURL)
  const blob = await reposne.blob()
  linkDownload(blob, '女生第一次去男方家里都洗碗吗？.txt')
}

async function downHtml() {
  const fileURL = new URL('./html-example.html', import.meta.url).href
  const reposne = await fetch(fileURL)
  const blob = await reposne.blob()
  linkDownload(blob, '探索 HTML 和 CSS 实现的蜡烛火焰.html')
}

function downJson() {
  //  // 也可以按上面的写法 利用请求实现 不过这里换个写法 将 JSON 内容字符串化并创建 Blob
  const blob = new Blob([JSON.stringify(jsonContent, null, 2)], { type: 'application/json' })
  linkDownload(blob, `随机 JSON 数据实例.json`)
}

async function downImage() {
  const fileURL = new URL('../../../../assets/images/logo.png', import.meta.url).href
  const reposne = await fetch(fileURL)
  const blob = await reposne.blob()
  linkDownload(blob, 'logo.png')
}

async function handleCopyText() {
  const fileURL = new URL('./txt-example.txt', import.meta.url).href
  const reposne = await fetch(fileURL)
  const text = await reposne.text()
  copyText(text)
  alert(`已复制到剪贴板`)
}
</script>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  // padding: 8px 16px;
  padding: 8px;
  color: var(--ap-color-white);
  background-color: var(--ap-color-primary);
  border-radius: 6px;
  border: 1px solid var(--ap-color-primary);
  transition: all 0.16s;
  &:hover {
    background-color: var(--ap-color-primary-light-3);
    border-color: var(--ap-color-primary-light-3);
  }
}
</style>
