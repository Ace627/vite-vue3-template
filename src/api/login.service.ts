import request from '@/utils/request'

function _mockApiResult(result: unknown): ApiResponseData {
  return { code: 200, message: '操作成功', success: true, timestamp: Date.now(), result }
}

/** 避免 hooks 写法下的命名冲突 */
export class LoginService {
  /** 登录 */
  static login(data: LoginEntity.LoginParams): ApiResult<string> {
    return new Promise((resolve, _) => resolve(_mockApiResult(data.account + data.password)))
  }

  /** 退出登录 */
  static logout() {
    return new Promise((resolve, _) => resolve(_mockApiResult('退出成功')))
  }
}
