<template>
  <div class="app-container" :class="classes">
    <aside class="sidebar-container">
      <div class="menu-item" v-for="(item, i) in viewList" :key="i" :class="{ 'is-active': activeComponent?.name === item.component.name }" @click="switchView(item.component)">
        {{ item.title }}
      </div>

      <footer>
        <button class="btn" type="button" @click="logout">
          <strong>退出登录</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>
          <div id="glow">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </button>
      </footer>
    </aside>

    <section class="main-container">
      <div class="app-main">
        <!-- key 采用 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用 -->
        <Transition :name="settingStore.transitionName" mode="out-in">
          <component :is="activeComponent" :key="route.path"></component>
        </Transition>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import RichText from '@/views/Example/RichText/index.vue'
import QrCodeDemo from '@/views/Example/QrCodeDemo/index.vue'
import iFrameDemo from '@/views/Example/iFrameDemo/index.vue'
import SvgIconDemo from '@/views/Example/SvgIconDemo/index.vue'
import StarfishDesign from '@/views/Example/iFrameDemo/StarfishDesign.vue'
import FormGenerator from '@/views/Example/iFrameDemo/FormGenerator.vue'
import SwitchDemo from '@/views/Example/SwitchDemo/index.vue'
import NotFound from '@/views/ExceptionPage/NotFound.vue'

/** Layout 布局响应式 */
useResize()

/** 读取 Pinia 仓库 */
const appStore = useApp()
const userStore = useUser()
const settingStore = useSetting()
const route = useRoute()

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
  { title: 'SvgIcon', component: SvgIconDemo },
  { title: 'NotFound页面', component: NotFound },
  { title: '链接内嵌示例', component: iFrameDemo },
  { title: 'Starfish表单设计', component: StarfishDesign },
  { title: 'FormGenerator表单设计', component: FormGenerator },
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
  }
}

.menu-item {
  display: flex;
  align-items: center;
  height: 42px;
  margin: 0 auto;
  padding-left: 16px;
  font-size: 14px;
  white-space: nowrap;
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
  min-height: 100%;
  margin-left: var(--app-sidebar-width);
  transition: margin-left 0.28s;
}

.app-main {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.mobile {
  .sidebar-container {
    width: 0;
  }
  .main-container {
    margin-left: 0;
  }
}

.btn {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 16px 0;
  padding: 8px 32px;
  background-size: 300% 300%;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
  transition: 0.5s;
  animation: gradient_301 5s ease infinite;
  border: double 4px transparent;
  background-image: linear-gradient(#212121, #212121), linear-gradient(137.48deg, #ffdb3b 10%, #fe53bb 45%, #8f51ea 67%, #0044ff 87%);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

#container-stars {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: 0.5s;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
}

strong {
  z-index: 2;
  font-family: 'Avalors Personal Use';
  font-size: 12px;
  letter-spacing: 5px;
  color: #ffffff;
  text-shadow: 0 0 4px white;
}

#glow {
  position: absolute;
  display: flex;
  width: 12rem;
}

.circle {
  width: 100%;
  height: 30px;
  filter: blur(2rem);
  animation: pulse_3011 4s infinite;
  z-index: -1;
}

.circle:nth-of-type(1) {
  background: rgba(254, 83, 186, 0.636);
}

.circle:nth-of-type(2) {
  background: rgba(142, 81, 234, 0.704);
}

.btn:hover #container-stars {
  z-index: 1;
  background-color: #212121;
}

.btn:hover {
  transform: scale(1.1);
}

.btn:active {
  border: double 4px #fe53bb;
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: none;
}

.btn:active .circle {
  background: #fe53bb;
}

#stars {
  position: relative;
  background: transparent;
  width: 200rem;
  height: 200rem;
}

#stars::after {
  content: '';
  position: absolute;
  top: -10rem;
  left: -100rem;
  width: 100%;
  height: 100%;
  animation: animStarRotate 90s linear infinite;
}

#stars::after {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
}

#stars::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 170%;
  height: 500%;
  animation: animStar 60s linear infinite;
}

#stars::before {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
  opacity: 0.5;
}

@keyframes animStar {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-135rem);
  }
}

@keyframes animStarRotate {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0);
  }
}

@keyframes gradient_301 {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse_3011 {
  0% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>
