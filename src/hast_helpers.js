/*
 * Hast helpers
 * ============
 *
 * These are some utility functions that deal with Hast nodes.
 *
 * @flow
 */

/**
 * Returns the class name of a HAST node.
 */

export function getClassName(node /*: HastNode */) {
  return node && (node.properties || {}).className
}

/**
 * Updates the last child of a HAST node.
 */

export function updateLastChild(
  node /*: HastNode */,
  fn /*: HastNode => HastNode */
) {
  const children /*: HastNode[] */ = node.children || []
  return { ...node, children: updateLast(children, fn) }
}

/**
 * Updates the last item on a list with a given `fn` function.
 */

export function updateLast(
  list /*: HastNode[] */,
  fn /*: HastNode => HastNode */
) {
  if (list.length === 0) return []
  const head /*: HastNode[] */ = list.slice(0, list.length - 1)
  const item /*: HastNode */ = list[list.length - 1]
  return [...head, fn(item)]
}

/**
 * Updates the `children` of a HAST node.
 */

export function updateChildren(
  node /*: HastNode */,
  fn /*: HastNode[] => HastNode[] */
) {
  const children = fn(node.children || [])
  return { ...node, children }
}

/**
 * Adds a child to a HAST node.
 */

export function appendChild(node /*: HastNode */, item /*: HastNode */) {
  const children = [...(node.children || []), item]
  return { ...node, children }
}

/**
 * Helper to convert to a class list.
 */

export function toClassList(str /*: string | string[] */) /*: string[] */ {
  if (typeof str === 'string') return str.split(' ')
  if (Array.isArray(str)) return str

  throw Object.assign(
    new Error(`Malformed className '${JSON.stringify(str)}'`),
    { code: 'MALFORMED_CLASSNAME', input: str }
  )
}
