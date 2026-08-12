import type { ExtractPublicPropTypes } from 'vue'
import type { TableColumnCtx, TableProps } from 'element-plus'

export interface ProTableColumn<T = any> extends Partial<TableColumnCtx> {
  /** 字段名（严格对应行数据 T 的属性名，杜绝手写错误） */
  prop?: string & keyof T
  /** 自定义插槽名称，用于自定义渲染列内容 */
  slot?: string
}

type NativeTableProps = ExtractPublicPropTypes<TableProps<Record<PropertyKey, any>>>

export interface ProTableProps extends NativeTableProps {
  /** 表格渲染列配置 */
  columns: ProTableColumn[]
  /** 表格数据加载状态 */
  loading?: boolean
  /** 表格数据加载状态提示文本 */
  elementLoadingText?: string
  /** 表格数据加载状态遮罩背景 */
  elementLoadingBackground?: string
}
