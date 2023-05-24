import Cookies from 'js-cookie'

const Token_Key = 'Custom_Token_Key'

export default () => {
  function getToken(): string {
    return Cookies.get(Token_Key) || ''
  }

  function setToken(token: string) {
    return Cookies.set(Token_Key, token)
  }

  function removeToken(): void {
    return Cookies.remove(Token_Key)
  }

  return { getToken, setToken, removeToken }
}
