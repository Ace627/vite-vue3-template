# 文件位置

src/hooks/useModel.ts

# 具体内容

```ts
import { ElLoading, ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import type { ElMessageBoxOptions, MessageOptions, NotificationOptions } from 'element-plus'

/** 消息提示 */
function msg(message: string, config: MessageOptions = {}) {
  ElMessage({ message, type: 'info', plain: true, ...config })
}

/** 错误消息 */
function msgError(message: string, config: MessageOptions = {}) {
  ElMessage({ message, type: 'error', plain: true, ...config })
}

/** 成功消息 */
function msgSuccess(message: string, config: MessageOptions = {}) {
  ElMessage({ message, type: 'success', plain: true, ...config })
}

/** 警告消息 */
function msgWarning(message: string, config: MessageOptions = {}) {
  ElMessage({ message, type: 'warning', plain: true, ...config })
}

/** 弹出提示 */
function alert(content: string, config: ElMessageBoxOptions = {}) {
  ElMessageBox.alert(content, '系统提示', { ...config })
}

/** 错误提示 */
function alertError(content: string, config: ElMessageBoxOptions = {}) {
  ElMessageBox.alert(content, '系统提示', { type: 'error', ...config })
}

/** 成功提示 */
function alertSuccess(content: string, config: ElMessageBoxOptions = {}) {
  ElMessageBox.alert(content, '系统提示', { type: 'success', ...config })
}

/** 警告提示 */
function alertWarning(content: string, config: ElMessageBoxOptions = {}) {
  ElMessageBox.alert(content, '系统提示', { type: 'warning', ...config })
}

/** 通知提示 */
function notify(message: string, config: Partial<NotificationOptions> = {}) {
  ElNotification({ title: '系统提示', type: 'info', message, ...config })
}

/** 错误通知 */
function notifyError(message: string, config: Partial<NotificationOptions> = {}) {
  ElNotification({ title: '系统提示', type: 'error', message, ...config })
}

/** 成功通知 */
function notifySuccess(message: string, config: Partial<NotificationOptions> = {}) {
  ElNotification({ title: '系统提示', type: 'success', message, ...config })
}

/** 警告通知 */
function notifyWarning(message: string, config: Partial<NotificationOptions> = {}) {
  ElNotification({ title: '系统提示', type: 'warning', message, ...config })
}

/** 确认窗体 */
function confirm(content: string, config: ElMessageBoxOptions = {}) {
  return ElMessageBox.confirm(content, '系统提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', ...config })
}

/** 提交内容 */
function prompt(content: string, config: ElMessageBoxOptions = {}) {
  return ElMessageBox.prompt(content, '系统提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', ...config })
}

/* 全局请求 loading 的唯一实例 */
let loadingInstance: ReturnType<typeof ElLoading.service>

/** 打开遮罩层 */
function showLoading(content: string = '正在加载...') {
  loadingInstance = ElLoading.service({ lock: true, text: content, background: 'rgba(0, 0, 0, 0.7)' })
}

/** 关闭遮罩层 */
function closeLoading() {
  loadingInstance.close()
}

export default () => {
  return {
    msg,
    msgError,
    msgSuccess,
    msgWarning,
    alert,
    alertError,
    alertSuccess,
    alertWarning,
    notify,
    notifyError,
    notifySuccess,
    notifyWarning,
    confirm,
    prompt,
    showLoading,
    closeLoading,
  }
}
```
