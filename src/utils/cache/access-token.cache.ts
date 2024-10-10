import { CacheKey } from '@/config'

const accessToken = useStorage<string>(CacheKey.ACCESS_TOKEN, null)

export const setAccessToken = (token: string) => (accessToken.value = token)

export const getAccessToken = (): string => accessToken.value

export const removeAccessToken = () => (accessToken.value = null)
