import { StorageCache } from '../storage-cache.util'
import type { RouteLocationNormalizedGeneric } from 'vue-router'

export type TagView = Partial<RouteLocationNormalizedGeneric>
export type TagViewKey = keyof TagView

export function setVisitedViews(views: TagView[]): void {
  // 删除不必要的属性，防止 JSON.stringify 处理到循环引用
  const delKeys: TagViewKey[] = ['matched', 'redirectedFrom']
  for (const view of views) delKeys.forEach((key) => delete view[key])
  StorageCache.set('visitedViews', views)
}

export function getVisitedViews(): TagView[] {
  return StorageCache.get('visitedViews') ?? []
}

export function setCachedViews(views: string[]): void {
  StorageCache.set('cachedViews', views)
}

export function getCachedViews(): string[] {
  return StorageCache.get('cachedViews') ?? []
}
