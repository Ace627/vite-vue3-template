<template>
  <div class="app-container" :class="classes">
    <aside class="sidebar-container">
      <div class="menu-item" v-for="(item, i) in viewList" :key="i" :class="{ 'is-active': activeComponent?.name === item.component.name }" @click="switchView(item.component)">
        {{ item.title }}
      </div>

      <footer>
        <button @click="logout">退出登录</button>
      </footer>
    </aside>

    <section class="main-container">
      <component :is="activeComponent"></component>
    </section>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import RichText from '@/views/Example/RichText/index.vue'
import QrCodeDemo from '@/views/Example/QrCodeDemo/index.vue'
import iFrameDemo from '@/views/Example/iFrameDemo/index.vue'
import SwitchDemo from '@/views/Example/SwitchDemo/index.vue'
import NotFound from '@/views/ExceptionPage/NotFound.vue'

/** Layout 布局响应式 */
useResize()

/** 读取 Pinia 仓库 */
const appStore = useApp()
const userStore = useUser()

/** 用来添加到根组件的动态类的集合 */
const classes = computed(() => {
  const cls: string[] = [appStore.device]
  return cls
})

const activeComponent = shallowRef<Component>(RichText)
const viewList = [
  { title: '富文本编辑器', component: RichText },
  { title: '二维码示例', component: QrCodeDemo },
  { title: '挺火的那个Switch', component: SwitchDemo },
  { title: 'NotFound页面', component: NotFound },
  { title: '链接内嵌示例', component: iFrameDemo },
]

function switchView(component: Component) {
  activeComponent.value = component
}
function logout() {
  userStore.logout()
  window.location.href = '/'
}
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;

  --app-sidebar-width: 200px;
}

.sidebar-container {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1001;
  width: var(--app-sidebar-width);
  height: 100%;
  color: #fff;
  background-color: #2b65d9;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  transition: width 0.28s;
  overflow: hidden;

  footer {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-top: 1px solid var(--app-color-white);
    button {
      cursor: pointer;
      font-size: 14px;
      margin: 10px auto;
      padding: 8px 10px;
      border-radius: 4px;
      color: var(--app-color-white);
      background-color: var(--app-color-danger);
    }
  }
}

.menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 32px;
  margin: 0 auto;
  font-size: 14px;
  white-space: nowrap;
  border-radius: 10px;
  transition: all 0.32s;
  cursor: pointer;
  &.is-active {
    color: #2b65d9;
    background-color: #fff;
  }
  &:first-of-type {
    margin-top: 16px;
  }
}

.main-container {
  position: relative;
  height: 100%;
  margin-left: var(--app-sidebar-width);
  transition: margin-left 0.28s;
}

.mobile {
  .sidebar-container {
    width: 0;
  }
  .main-container {
    margin-left: 0;
  }
}
</style>
