import type { SystemSetting } from '@/defaultSettings'

import { StorageCache } from '../storage-cache.util'

export function setSystemSetting(config: SystemSetting) {
  // CacheUtil.set(CacheConstant.SYSTEM_SETTING, config)
  StorageCache.set('systemSetting', config)
}

export function getSystemSetting(): SystemSetting | null {
  return StorageCache.get<SystemSetting>('systemSetting')
}

export function removeSystemSetting() {
  StorageCache.remove('systemSetting')
}
