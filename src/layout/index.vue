<template>
  <div class="app-container wh-full relative">
    <aside class="sidebar-container">
      <router-link v-for="(item, index) in routeList" :key="index" :to="item.path" :class="{ active: route.path === item.path }">{{ item.title }}</router-link>
    </aside>

    <section class="main-container">
      <div class="app-main">
        <!-- key 采用 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用 -->
        <RouterView v-slot="{ Component, route }">
          <Transition name="fade-transform" mode="out-in">
            <component :is="Component" :key="route.path" />
          </Transition>
        </RouterView>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })

const route = useRoute()
const routeList = [
  { title: '支付宝AR扫福动画', path: '/ArAnimation' },
  { title: '京东左侧导航条', path: '/JdNavbar' },
]
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
}

.sidebar-container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--sidebar-width);
  height: 100%;
  background-color: #262935;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }

  a {
    padding: 8px 0;
    color: #fff;

    &.active {
      font-weight: bold;
      color: #c81623;
    }
  }
}

.main-container {
  position: relative;
  height: 100%;
  margin-left: var(--sidebar-width);
  transition: margin-left 0.28s;
}

.app-main {
  position: relative;
  width: 100%;
  overflow: hidden;
}
</style>
