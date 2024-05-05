declare module '@wangeditor/editor-for-vue' {
  import type { IEditorConfig, IDomEditor, IToolbarConfig } from '@wangeditor/editor'

  /** 定义插入函数的类型 */
  type InsertFnType = (url: string, alt?: string, href?: string) => void
  const Editor: IDomEditor
  const Toolbar: IToolbarConfig
}
