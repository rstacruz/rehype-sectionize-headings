// @flow
import { getClassName, updateLast, appendChild } from './hast_helpers'

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
  {
    tagName = 'h2',
    sectionTag = 'div',
    sectionClass = ['h2-section'],
    bodyTag = 'div',
    bodyClass = ['body']
  } = {}
) {
  const children = root.children.reduce((list, node) => {
    if (node.tagName === tagName) {
      // H2 heading - create a new `.h2-section`.
      const extraClass = getClassName(node)
      const body = wrapper(bodyTag, [...bodyClass, extraClass], [])
      return [
        ...list,
        wrapper(sectionTag, [...sectionClass, extraClass], [node, body])
      ]
    } else if (list.length) {
      // Not prelude
      return updateLast(list, last => ({
        ...last,
        children: updateLast(last.children, body => appendChild(body, node))
      }))
    } else {
      // Prelude
      const body = wrapper(bodyTag, bodyClass, [node])
      return [wrapper(sectionTag, sectionClass, [body])]
    }
  }, [])

  return { ...root, children }
}

/**
 * Creates a wrapper element.
 */

function wrapper(tag: string, className: string[], children: HastNode[]) {
  return {
    type: 'element',
    tagName: tag,
    properties: { className },
    children
  }
}
