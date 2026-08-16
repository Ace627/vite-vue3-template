// 引入 ECharts 核心模块，核心模块提供了 ECharts 使用必须要的接口
import * as echarts from 'echarts/core'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 标签自动布局、全局过渡动画等特性
import { UniversalTransition } from 'echarts/features'
// 引入项目中使用到的图表，图表后缀都为 Chart
import { BarChart, BoxplotChart, LineChart, PieChart, RadarChart, GaugeChart, ScatterChart, CandlestickChart, MapChart, EffectScatterChart, LinesChart } from 'echarts/charts'
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import { GraphicComponent, GridComponent, LegendComponent, LegendScrollComponent, PolarComponent, TitleComponent, TooltipComponent, GeoComponent } from 'echarts/components'

// 注册必须的组件
echarts.use([
  ScatterChart,
  GaugeChart,
  CandlestickChart,
  GraphicComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  LegendScrollComponent,
  TitleComponent,
  LineChart,
  BarChart,
  PieChart,
  BoxplotChart,
  CanvasRenderer,
  UniversalTransition,
  RadarChart,
  PolarComponent,
  MapChart,
  GeoComponent,
  EffectScatterChart,
  LinesChart,
])

export default { ...echarts }
