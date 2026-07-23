import { ElLoading, ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import type { ElMessageBoxOptions, LoadingOptionsResolved, MessageOptions, NotificationOptions } from 'element-plus'

/* 全局请求 loading 的唯一实例 */
let loadingInstance: ReturnType<typeof ElLoading.service>

export abstract class TipModal {
  /** 消息提示 */
  static msg(message: string, config: MessageOptions = {}) {
    ElMessage({ plain: true, ...config, message, type: 'info' })
  }

  /** 错误消息 */
  static msgError(message: string, config: MessageOptions = {}) {
    ElMessage({ plain: true, ...config, message, type: 'error' })
  }

  /** 成功消息 */
  static msgSuccess(message: string, config: MessageOptions = {}) {
    ElMessage({ plain: true, ...config, message, type: 'success' })
  }

  /** 警告消息 */
  static msgWarning(message: string, config: MessageOptions = {}) {
    ElMessage({ plain: true, ...config, message, type: 'warning' })
  }

  /** 弹出提示 */
  static alert(content: string, config: ElMessageBoxOptions = {}) {
    ElMessageBox.alert(content, '系统提示', { showClose: false, confirmButtonText: '知道了', ...config })
  }

  /** 错误提示 */
  static alertError(content: string, config: ElMessageBoxOptions = {}) {
    ElMessageBox.alert(content, '系统提示', { showClose: false, confirmButtonText: '知道了', ...config, type: 'error' })
  }

  /** 成功提示 */
  static alertSuccess(content: string, config: ElMessageBoxOptions = {}) {
    ElMessageBox.alert(content, '系统提示', { showClose: false, confirmButtonText: '知道了', ...config, type: 'success' })
  }

  /** 警告提示 */
  static alertWarning(content: string, config: ElMessageBoxOptions = {}) {
    ElMessageBox.alert(content, '系统提示', { showClose: false, confirmButtonText: '知道了', ...config, type: 'warning' })
  }

  /** 通知提示 */
  static notify(message: string, config: Partial<NotificationOptions> = {}) {
    ElNotification({ title: '系统提示', ...config, message, type: 'info' })
  }

  /** 错误通知 */
  static notifyError(message: string, config: Partial<NotificationOptions> = {}) {
    ElNotification({ title: '系统提示', ...config, message, type: 'error' })
  }

  /** 成功通知 */
  static notifySuccess(message: string, config: Partial<NotificationOptions> = {}) {
    ElNotification({ title: '系统提示', ...config, message, type: 'success' })
  }

  /** 警告通知 */
  static notifyWarning(message: string, config: Partial<NotificationOptions> = {}) {
    ElNotification({ title: '系统提示', ...config, message, type: 'warning' })
  }

  /** 确认窗体 */
  static async confirm(content: string, config: ElMessageBoxOptions = {}): Promise<{ confirm: boolean; cancel: boolean }> {
    try {
      await ElMessageBox.confirm(content, '系统提示', { confirmButtonText: '确定', cancelButtonText: '取消', showClose: false, ...config, type: 'warning' })
      return { confirm: true, cancel: false }
    } catch (error) {
      return { confirm: false, cancel: true }
    }
  }

  /** 提交内容 */
  static async prompt(content: string, config: ElMessageBoxOptions = {}) {
    try {
      const { value } = await ElMessageBox.prompt(content, '系统提示', { confirmButtonText: '确定', cancelButtonText: '取消', ...config, type: 'warning' })
      return { confirm: true, cancel: false, value }
    } catch (error: unknown) {
      return { cancel: true, confirm: false, value: '' }
    }
  }

  /** 打开遮罩层 */
  static showLoading(
    content: string = '正在加载...',
    options: Partial<Omit<LoadingOptionsResolved, 'parent' | 'target'> & { target: HTMLElement | string; body: boolean }> = {},
  ) {
    const background = 'rgba(0,0,0,0.7)'
    loadingInstance = ElLoading.service({ lock: true, background, ...options, text: content })
  }

  /** 关闭遮罩层 */
  static hideLoading() {
    loadingInstance.close()
  }
}
