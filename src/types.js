/*
 * Flow types
 * ==========
 *
 * Some types for Flow.
 *
 * @flow
 */

export type HastType = 'comment' | 'element' | 'text'

export type HastNode = {
  type: HastType,
  tagName?: string,
  value?: string,
  properties: Object,
  children?: HastNodeList
}

// htmlAst = {
//   type: 'element'
//   tagName: 'h2'
//   properties: {}
//   children: []
// }
// { type: 'comment', value: 'sup' }
// { type: 'text', value: 'hello' }
