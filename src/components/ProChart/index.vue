<template>
  <!-- 图表容器，使用 wh-full 类名设置宽高为 100% -->
  <div class="pro-chart relative" ref="proChartRef" :style="styles"></div>
</template>
<script setup lang="ts">
defineOptions({ name: 'ProChart' })
import { echarts, isEmpty, isNumber } from '@/utils'
import type { EChartsType, EChartsOption } from 'echarts'

/**
 * 组件 Props 定义
 * @property {EChartsOption} options - ECharts 核心配置项，遵循 ECharts 官方配置规范，必传且默认空对象
 */
const props = defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '100%' },
  options: { type: Object as PropType<EChartsOption>, default: () => ({}) },
})

const settingStore = useSettingStore()

const styles = computed(() => ({
  width: isNumber(props.width) ? `${props.width}px` : props.width,
  height: isNumber(props.height) ? `${props.height}px` : props.height,
}))

/** 获取图表 DOM 元素的引用 */
const chartDOM = useTemplateRef('proChartRef')
/** 存储初始化后的 ECharts 实例，null 表示未初始化/已销毁 */
let chartInstance: EChartsType | null = null
/** 尺寸监听实例，用于实现图表自适应，null 表示未创建/已断开 */
let chartResizeObserver: ResizeObserver | null = null

/**
 * 初始化 ECharts 实例
 * @description 1. 校验容器 DOM 存在性；2. 创建 ECharts 实例；3. 若配置非空则立即渲染图表
 */
function init() {
  // 校验：容器 DOM 不存在则终止初始化
  if (!chartDOM.value) return
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
  // if (chartDOM.value.clientWidth === 0 || chartDOM.value.clientHeight === 0) return
  // 初始化 ECharts 实例（绑定到指定 DOM 容器）
  chartInstance = echarts.init(chartDOM.value, settingStore.isDark ? 'dark' : 'light') as unknown as EChartsType
  // 若传入的 options 非空，则立即更新图表配置（渲染初始图表）
  if (!isEmpty(props.options)) updateChart()
}

/**
 * 更新图表配置
 * @description 1. 校验 ECharts 实例存在性；2. 调用 setOption 更新图表配置（默认合并模式）
 * @remarks 合并模式：新配置会与旧配置合并，而非完全替换，适合局部更新
 */
function updateChart() {
  if (!chartInstance) return
  chartInstance.setOption({ backgroundColor: 'transparent', ...props.options }, false)
}

/**
 * 调整图表尺寸自适应
 * @description 1. 校验 ECharts 实例存在性；2. 触发图表尺寸重置，配置平滑动画过渡
 * @param {ResizeOption} animation - 尺寸调整动画配置：160ms 过渡时长 + quadraticOut 缓动函数
 */
function resizeChart() {
  if (!chartInstance) return
  chartInstance.resize({ animation: { duration: 160, easing: 'quadraticOut' } })
}

/**
 * 销毁图表资源（核心：防止内存泄漏）
 * @description 1. 销毁 ECharts 实例并清空引用；2. 断开 ResizeObserver 监听并清空引用
 * @remarks 必须在组件卸载时调用，否则会导致内存泄漏
 */
function dispose() {
  if (!chartInstance) return
  chartInstance.dispose()
  chartInstance = null
  if (!chartResizeObserver) return
  chartResizeObserver.disconnect()
  chartResizeObserver = null
}

/**
 * 初始化尺寸监听（自适应核心）
 * @description 1. 校验容器 DOM 和 ResizeObserver 兼容性；2. 创建监听器；3. 监听容器尺寸变化并触发自适应
 */
function initResizeObserver() {
  if (!chartDOM.value || !window.ResizeObserver) return
  chartResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) entry.target === chartDOM.value && resizeChart()
  })
  chartResizeObserver.observe(chartDOM.value)
}

/**
 * 监听配置项变化：自动更新图表
 * @description 深度监听 props.options 变化，触发图表配置更新
 */
watch(
  () => props.options,
  () => updateChart(),
  { deep: true },
)

// 切换主题时 → 自动重新初始化图表
watch(
  () => settingStore.isDark,
  () => {
    init()
  },
)

onMounted(async () => {
  init()
  initResizeObserver()
})

onUnmounted(() => dispose())

defineExpose({
  getInstance: () => chartInstance,
})
</script>

<style lang="scss" scoped></style>
