const Token_Key = 'Admin_Token_Key'

/** 从本地读取 token */
export const getToken = (): string => localStorage.getItem(Token_Key) || ''

/** 向本地存储 token */
export const setToken = (token: string): void => localStorage.setItem(Token_Key, token)

/** 移除本地存储的 token */
export const remove = (): void => localStorage.removeItem(Token_Key)
