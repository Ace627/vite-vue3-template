<template>
  <div class="app-content">
    <div class="list">
      <div class="item">
        <div class="column title">时间戳 秒</div>
        <div class="column content">{{ dayjs().unix() }}</div>
        <div class="column operation"><SvgIcon name="CopyDocument" @click="handleCopy(`dayjs().unix()`)" /></div>
      </div>
      <div class="item">
        <div class="column title">时间戳 豪秒</div>
        <div class="column content">{{ dayjs().valueOf() }}</div>
        <div class="column operation"><SvgIcon name="CopyDocument" @click="handleCopy(`dayjs().valueOf()`)" /></div>
      </div>
      <div class="item">
        <div class="column title">年月日时分秒 12h</div>
        <div class="column content">{{ dayjs().format('YYYY-MM-DD hh:mm:ss') }}</div>
        <div class="column operation"><SvgIcon name="CopyDocument" @click="handleCopy(`dayjs().format('YYYY-MM-DD hh:mm:ss')`)" /></div>
      </div>
      <div class="item">
        <div class="column title">年月日时分秒 24h</div>
        <div class="column content">{{ dayjs().format('YYYY-MM-DD HH:mm:ss') }}</div>
        <div class="column operation"><SvgIcon name="CopyDocument" @click="handleCopy(`dayjs().format('YYYY-MM-DD HH:mm:ss')`)" /></div>
      </div>
      <div class="item">
        <div class="column title">本周属于第几周</div>
        <div class="column content">{{ weekOfYear() }}</div>
        <div class="column operation"><SvgIcon name="CopyDocument" /></div>
      </div>
      <div class="item">
        <div class="column title">今天是星期几</div>
        <div class="column content">{{ dayjs().day() ?? 7 }}</div>
        <div class="column operation"><SvgIcon name="CopyDocument" /></div>
      </div>
      <div class="item">
        <div class="column title">当前月天数</div>
        <div class="column content">{{ dayjs().daysInMonth() }}</div>
        <div class="column operation"><SvgIcon name="CopyDocument" /></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'TimeFormat' })
import dayjs from 'dayjs'
import { copyText } from '@/utils/download'
import { weekOfYear } from '@/utils/format-time'

const appStore = useAppStore()
const showTitle = computed(() => (appStore.isMobile ? 'none' : 'block'))

function handleCopy(value: string) {
  copyText(value)
  alert(`复制成功`)
}
</script>

<style lang="scss" scoped>
.list {
  width: 500px;
  margin: 0 auto;
  border-left: 1px solid #1ba784;
  border-top: 1px solid #1ba784;
}
.mobile .list {
  width: 100%;
}

.item {
  display: flex;
  align-items: center;
  .column {
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-right: 1px solid #1ba784;
    border-bottom: 1px solid #1ba784;
  }
  .title {
    display: v-bind(showTitle);
    width: 160px;
  }
  .content {
    width: 220px;
  }
  .operation {
    flex: 1;
  }
  .svg-icon {
    &:hover {
      color: #1ba784;
    }
  }
}
</style>
