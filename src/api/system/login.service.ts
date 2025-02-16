import request from '@/utils/request'

function _mockApiResult(result: unknown): any {
  return { code: 200, message: '操作成功', success: true, timestamp: Date.now(), result }
}

/** 避免 hooks 写法下的命名冲突 */
export class LoginService {
  /** 获取验证码 */
  static getCaptcha(): Promise<CaptchaData> {
    // return request.get('/captcha')
    return new Promise((resolve, _) => resolve({ captcha: 'aaaa', uuid: 'argh' }))
  }

  /** 登录 */
  static login(data: LoginAccountDto): Promise<LoginResult> {
    // return request.post('/login',data)
    return new Promise((resolve, _) => resolve({ accessToken: `data.accountdata.password` }))
  }

  /** 退出登录 */
  static logout() {
    // return request.post('/logout',data)
    return new Promise((resolve, _) => resolve(_mockApiResult('退出成功')))
  }
}
