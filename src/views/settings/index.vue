<template>
  <div class="app-content settings">
    <div class="settings__container">
      <h1 class="settings__title">设置</h1>

      <!-- 主题明暗 -->
      <div class="settings__row">
        <span class="settings__label">主题模式</span>
        <el-switch :model-value="isDark" @click="onThemeClick" />
      </div>

      <!-- 组件尺寸 -->
      <div class="settings__row">
        <span class="settings__label">组件尺寸</span>
        <el-radio-group v-model="settingStore.size">
          <el-radio value="default">默认</el-radio>
          <el-radio value="small">紧凑</el-radio>
          <el-radio value="large">宽松</el-radio>
        </el-radio-group>
      </div>

      <!-- 动态标题 -->
      <div class="settings__row">
        <span class="settings__label">动态标题</span>
        <el-switch v-model="settingStore.showDynamicTitle" />
      </div>

      <!-- 系统水印 -->
      <div class="settings__row">
        <span class="settings__label">系统水印</span>
        <el-switch v-model="settingStore.showWatermark" />
      </div>

      <!-- 路由转场 -->
      <div class="settings__row">
        <span class="settings__label">路由转场</span>
        <el-select v-model="settingStore.transition" style="width: 160px">
          <el-option label="滑动位移" value="fade-transform" />
          <el-option label="线性淡入" value="el-fade-in-linear" />
          <el-option label="缓动淡入" value="el-fade-in" />
          <el-option label="中心缩放" value="el-zoom-in-center" />
          <el-option label="顶部展开" value="el-zoom-in-top" />
          <el-option label="底部展开" value="el-zoom-in-bottom" />
        </el-select>
      </div>

      <div class="settings__actions">
        <el-button type="primary" class="settings__save" @click="onSave">保存设置</el-button>
        <el-button type="danger" plain class="settings__reset" @click="onReset"> 重置设置 </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Settings' })

const settingStore = useSettingStore()
const { applyTheme, isDark } = useTheme()

/** 主题切换：用点击坐标做从点击点扩散的圆形动效（与导航栏一致） */
function onThemeClick(event: MouseEvent) {
  applyTheme(isDark.value ? 'light' : 'dark', event)
}

/** 保存设置：统一落盘（theme 经 useTheme 即时保存，size/动态标题 经此按钮落盘） */
function onSave() {
  settingStore.saveSetting()
}

/** 重置：清缓存 + reload（store 内已实现 loading 与 reload） */
function onReset() {
  settingStore.resetSetting()
}
</script>

<style lang="scss" scoped>
.settings {
  &__container {
    max-width: 720px;
    margin: 0 auto;
    padding: 24px;
    background: var(--el-bg-color);
    border-radius: 8px;
    box-shadow: var(--el-box-shadow-light);
  }

  &__title {
    margin: 0 0 24px;
    font-size: 20px;
    font-weight: 600;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  &__label {
    font-size: 14px;
    color: var(--el-text-color-primary);
  }

  &__actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }

  &__reset {
    margin-top: 0;
  }
}

/* ===== 移动端适配（沿用 404.vue 的 html[data-device='mobile'] 覆盖范式） ===== */
html[data-device='mobile'] .settings {
  &__container {
    padding: 16px;
    box-shadow: none;
  }

  &__row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  &__actions {
    flex-direction: column;
  }

  &__reset {
    width: 100%;
  }

  &__save {
    width: 100%;
  }
}
</style>
