import { CacheKey } from '@/config'

const refreshToken = useStorage<string>(CacheKey.REFRESH_TOKEN, null)

export const setRefreshToken = (token: string) => (refreshToken.value = token)

export const getRefreshToken = (): string => refreshToken.value

export const removeRefreshToken = () => (refreshToken.value = null)
