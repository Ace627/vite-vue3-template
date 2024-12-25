/** 登录所需要的参数 */
interface LoginAccountDto {
  username: string
  password: string
  captcha: string
  uuid: string
  rememberMe: boolean
}

interface CaptchaData {
  captcha: string
  uuid: string
}

interface LoginResult {
  accessToken: string
}

interface RememberLoginDto extends Pick<LoginUserDto, 'password' | 'username' | 'rememberMe'> {}
