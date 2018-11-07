import {
  updateLastChild,
  updateChildren,
  toClassList
} from './lib/hast_helpers'

import wrapHeadings from './wrap_headings'

/*::
  export type WrapOptions = {
    sectionClass: string[],
    bodyClass: string[]
  }

  export type Options = {
    h2: WrapOptions,
    h3: WrapOptions
  }
*/

/**
 * Default settings for `wrapH2()` and `wrapH3()`.
 */

const DEFAULTS = {
  h2: {
    sectionClass: ['h2-section'],
    bodyClass: ['body', 'h3-section-list']
  },

  h3: {
    sectionClass: ['h3-section'],
    bodyClass: ['body']
  }
}

/**
 * Wrap everything with the default settings used by devhints.io.
 *
 * @example
 * This wraps with default settings:
 *
 *     hast = wrap(hast)
 *
 * @example
 * You can also specify class names like so:
 *
 *     hast = wrap(hast, {
 *       h2: {
 *         sectionClass: ['h2-section'],
 *         bodyClass: ['body']
 *       },
 *       h3: {
 *         sectionClass: ['h3-section'],
 *         bodyClass: ['body']
 *       }
 *     })
 */

export default function(root, options = {} /*: Options */) {
  root = wrapH2(root, options.h2)

  root = updateChildren(root, children =>
    (children || []).map(section =>
      updateLastChild(section, body => wrapH3(body, options.h3))
    )
  )

  return root
}

/**
 * Wrap H2 headings.
 */

export function wrapH2(root, options /*: WrapOptions */) {
  const { sectionClass, bodyClass } = { ...DEFAULTS.h2, ...options }

  return wrapHeadings(root, {
    tagName: 'h2',
    sectionClass: toClassList(sectionClass),
    bodyClass: toClassList(bodyClass)
  })
}

/**
 * Wraps H3 headings.
 */

export function wrapH3(root, options /*: WrapOptions */) {
  const { sectionClass, bodyClass } = { ...DEFAULTS.h3, ...options }

  return wrapHeadings(root, {
    tagName: 'h3',
    sectionClass: toClassList(sectionClass),
    bodyClass: toClassList(bodyClass)
  })
}

export { default as wrapHeadings } from './wrap_headings'
