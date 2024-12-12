<template>
  <div class="rich-editor">
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" class="rich-editor__toolbar" />
    <Editor class="rich-editor__container" v-model="content" :defaultConfig @onCreated="handleCreated" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'RichEditor', inheritAttrs: false })
import { isString } from 'lodash-es'
import '@wangeditor-next/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue'
import type { IDomEditor, IToolbarConfig, IEditorConfig } from '@wangeditor-next/editor'

const props = defineProps({
  height: { type: [String, Number], default: 400 }
})

const height = computed(() => (isString(props.height) ? props.height : `${props.height}px`))

/** 辑器实例，必须用 shallowRef */
const editorRef = shallowRef<IDomEditor>()
/** 内容 HTML */
const content = defineModel({ type: String, required: true, default: '' })
/** 工具栏配置 */
const toolbarConfig: Partial<IToolbarConfig> = {
  // 如果仅仅想排除掉某些菜单，其他都保留，可以使用 excludeKeys 来配置
  // https://cycleccc.github.io/docs/guide/toolbar-config#excludekeys
  excludeKeys: ['group-video']
}
/** 编辑器默认配置 */
const defaultConfig: Partial<IEditorConfig> = { placeholder: '请输入内容...', MENU_CONF: {} }

/** 编辑器创建完毕时的回调函数 */
function handleCreated(editor: IDomEditor) {
  editorRef.value = editor
}

/**
 * 自定义编辑器 alert 。如想用 el 的 message 功能
 * https://cycleccc.github.io/docs/guide/editor-config#customalert
 */
// defaultConfig.customAlert = (message: string, type: string) => {
//   switch (type) {
//     case 'success':
//       useModal().msgSuccess(message)
//       break
//     case 'warning':
//       useModal().msgWarning(message)
//       break
//     case 'error':
//       useModal().msgError(message)
//       break
//     default:
//       useModal().msg(message)
//       break
//   }
// }

/**
 * 自定义图片上传功能
 * https://cycleccc.github.io/docs/guide/menu-config#自定义上传
 */
defaultConfig.MENU_CONF!.uploadImage = { customUpload: customUploadImage } as any
async function customUploadImage(file: File, insertFn: (url: string, alt: string, href: string) => void) {
  // file 即选中的文件 自己实现上传，并得到图片 url alt href
  // 最后插入图片 insertFn(url, alt, href)
  // 本地临时模拟一下
  console.log(401, `file 即选中的文件 自己实现上传，并得到图片 url alt href。最后插入图片 insertFn(url, alt, href)。本地临时模拟一下`)
  console.log('file: ', file)
  const temURL = URL.createObjectURL(file)
  insertFn(temURL, file.name, temURL)
  // URL.revokeObjectURL(temURL)
}

onUnmounted(() => {
  // 组件销毁时，也及时销毁编辑器
  editorRef.value?.destroy()
})
</script>

<style lang="scss" scoped>
.rich-editor {
  display: flex;
  flex-direction: column;
  height: v-bind(height);
  border: var(--el-border);
  overflow: hidden;

  /* 提升层级 防止编辑器全屏被其它元素遮盖 */
  &.w-e-full-screen-container {
    z-index: 2024;
  }

  /* 工具栏的容器元素 */
  &__toolbar {
    border-bottom: var(--el-border);
  }

  /* 编辑区域的容器元素 */
  &__container {
    height: 100% !important; // 默认 style 有个高度样式 这里增加权重 便于覆盖重写
    :deep(.w-e-text-container) {
      height: 100%;
      overflow: hidden;
      .w-e-progress-bar {
        display: none;
      }
      .w-e-max-length-info {
        display: none;
      }
      .w-e-scroll {
        position: absolute;
        left: 0;
        top: 0;
        // z-index: 2 ;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        [id^='w-e-textarea-'] {
          min-height: 100%;
          overflow: hidden; // 防止刚进来 空白内容也出现滚动条
        }
      }
    }
  }
}

/* 恢复被重置的样式 */
:deep(.w-e-text-container) {
  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }
  em strong {
    font-style: italic;
  }
}
</style>
