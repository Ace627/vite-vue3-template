export default [
  'bold',
  'italic',
  'underline',
  'through',

  'blockquote',
  'codeBlock',

  { key: 'group-list-method', title: '列表', menuKeys: ['numberedList', 'bulletedList'] },

  'todo',

  { key: 'group-indent-method', title: '缩进', menuKeys: ['indent', 'delIndent'] },

  'headerSelect',
  'fontFamily',
  'fontSize',
  'lineHeight',

  'color',
  'bgColor',
  'clearStyle',

  {
    key: 'group-align-method',
    title: '对齐',
    menuKeys: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyJustify'],
  },
  {
    key: 'group-link-method',
    title: '链接',
    menuKeys: ['insertLink', 'editLink', 'unLink', 'viewLink'],
  },
  {
    key: 'group-image-method',
    title: '图片',
    menuKeys: ['uploadImage', 'insertImage', 'deleteImage', 'editImage'],
  },
  {
    key: 'group-video-method',
    title: '视频',
    menuKeys: ['uploadVideo', 'insertVideo'],
  },
  'insertTable',
  'divider',
  'emotion',
  'fullScreen',
]
