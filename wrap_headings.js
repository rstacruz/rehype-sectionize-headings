import { getClassName, updateLast, appendChild } from './lib/hast_helpers'

/**
 * Wraps headings.
 *
 *     hast = wrapHeadings(hast, {
 *       tagName: 'h2',
 *       sectionClass: ['h2-section'],
 *       bodyClass: ['body']
 *     })
 */

export default function wrapHeadings(
  root,
  { tagName = 'h2', sectionClass = ['h2-section'], bodyClass = ['body'] } = {}
) {
  const children = root.children.reduce((list, node) => {
    if (node.tagName === tagName) {
      // H2 heading - create a new `.h2-section`.
      const extraClass = getClassName(node)
      const body = wrapper([...bodyClass, extraClass], [])
      return [...list, wrapper([...sectionClass, extraClass], [node, body])]
    } else if (list.length) {
      // Not prelude
      return updateLast(list, last => ({
        ...last,
        children: updateLast(last.children, body => appendChild(body, node))
      }))
    } else {
      // Prelude
      const body = wrapper(bodyClass, [node])
      return [wrapper(sectionClass, [body])]
    }
  }, [])

  return { ...root, children }
}

/**
 * Creates a wrapper element.
 */

function wrapper(className /*: string[] */, children /*: HastNodeList */) {
  return {
    type: 'element',
    tagName: 'div',
    properties: { className },
    children
  }
}
