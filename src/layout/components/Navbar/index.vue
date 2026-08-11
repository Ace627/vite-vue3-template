<template>
  <div class="navbar">
    <div class="navbar__left h-full pl-8px">
      <AppLogo :show-title="!appStore.isCollapse" />
    </div>

    <div class="navbar__right h-full ml-auto flex-center">
      <!-- 设置入口 -->
      <el-tooltip content="设置" effect="dark" placement="bottom">
        <span class="navbar-item hover-effect" @click="goSettings">
          <SvgIcon name="Setting" size="1.16em" />
        </span>
      </el-tooltip>

      <!-- 主题切换 -->
      <el-tooltip :content="settingStore.isDark ? '浅色主题' : '深色主题'" effect="dark" placement="bottom">
        <ThemeSwitch class="navbar-item hover-effect" />
      </el-tooltip>

      <!-- 个人中心 -->
      <UserDropDown class="navbar-item hover-effect" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Navbar' })
import ThemeSwitch from './ThemeSwitch.vue'
import AppLogo from '../AppLogo/index.vue'
import UserDropDown from './UserDropDown.vue'

const appStore = useAppStore()
const settingStore = useSettingStore()
const router = useRouter()

/** 进入设置页：用 router.push 替代 router-link，规避 <a> 默认链接色与 hover/active 变色 */
function goSettings() {
  router.push('/settings')
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--el-navbar-height);
  background-color: var(--el-navbar-bg-color);
  box-shadow: var(--el-navbar-box-shadow);
}
.navbar-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  transition: background-color var(--el-transition-duration-fast);
}
.hover-effect:hover {
  background-color: var(--el-fill-color);
}
</style>
