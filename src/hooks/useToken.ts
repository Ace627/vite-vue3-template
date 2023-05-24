import Cookies from 'js-cookie'

// 设置存取 token 的 key
const Token_Key = 'Custom_Token_Key'

export default () => {
  // 从本地读取 token
  const getToken = (): string => Cookies.get(Token_Key) || ''

  // 向本地存储 token
  const setToken = (token: string): string | undefined => Cookies.set(Token_Key, token)

  // 移除本地存储的 token
  const removeToken = (): void => Cookies.remove(Token_Key)

  return { getToken, setToken, removeToken }
}
