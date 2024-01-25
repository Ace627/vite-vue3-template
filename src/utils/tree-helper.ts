// 参考文献：https://github.com/vbenjs/vue-vben-admin/blob/main/src/utils/helper/treeHelper.ts

interface TreeHelperConfig {
  id: string
  children: string
  parentId: string
}

/** 默认配置 */
const DEFAULT_CONFIG: TreeHelperConfig = { id: 'id', children: 'children', parentId: 'parentId' }

/** 获取配置 Object.assign 从一个或多个源对象复制到目标对象 */
const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config)

/** 列表型数据转化树型 */
export function transformListToTree<T = any>(list: any[], config: Partial<TreeHelperConfig> = {}): T[] {
  const { id, parentId, children } = getConfig(config) as TreeHelperConfig
  const nodeMap = new Map()
  const treeList: T[] = []
  for (const node of list) {
    node[children] = node[children] || []
    nodeMap.set(node[id], node)
  }
  for (const node of list) {
    const parent = nodeMap.get(node[parentId])
    ;(parent ? parent[children] : treeList).push(node)
  }
  return treeList
}

/** 树型数据转化列表型 */
export function transformTreeToList<T = any>(tree: any, config: Partial<TreeHelperConfig> = {}): T[] {
  const { children } = getConfig(config) as TreeHelperConfig
  const list = [...tree]
  for (let i = 0; i < list.length; i++) {
    if (!list[i][children]) continue
    list.splice(i + 1, 0, ...list[i][children])
    delete list[i][children]
  }
  return list
}
