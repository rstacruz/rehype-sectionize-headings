/* @jsx h */
/* eslint-env jest */

import wrap, { wrapH2, wrapH3 } from '../index'
import h from 'hastscript'
import render from 'hast-util-to-html'

/*
 * Test wrapping h2
 */

describe('wrapH2', () => {
  it('works', () => {
    const input = (
      <div>
        <h2>Introduction</h2>
        <p>Hello there</p>
      </div>
    )

    const expected = (
      <div>
        <div className="h2-section">
          <h2>Introduction</h2>
          <div className="body h3-section-list">
            <p>Hello there</p>
          </div>
        </div>
      </div>
    )

    const output = wrapH2(input)
    expect(render(output)).toEqual(render(expected))
  })

  it('finds 2 h2s', () => {
    const input = (
      <div>
        <h2>Introduction</h2>
        <p>hello there</p>
        <h2>Usage</h2>
        <p>how are you</p>
      </div>
    )

    const expected = (
      <div>
        <div className="h2-section">
          <h2>Introduction</h2>
          <div className="body h3-section-list">
            <p>hello there</p>
          </div>
        </div>
        <div className="h2-section">
          <h2>Usage</h2>
          <div className="body h3-section-list">
            <p>how are you</p>
          </div>
        </div>
      </div>
    )

    const output = wrapH2(input)
    expect(render(output)).toEqual(render(expected))
  })

  it('works preludes', () => {
    const input = (
      <div>
        <p>hello there</p>
        <h2>Usage</h2>
        <p>how are you</p>
      </div>
    )

    const expected = h('div', [
      h('.h2-section', [
        // TODO may kulang dito
        h('.body.h3-section-list', [h('p', 'hello there')])
      ]),
      h('.h2-section', [
        h('h2', 'Usage'),
        h('.body.h3-section-list', [h('p', 'how are you')])
      ])
    ])

    const output = wrapH2(input)
    expect(render(output)).toEqual(render(expected))
  })
})

/*
 * Test wrapping H3
 */

describe('wrapH3', () => {
  it('works', () => {
    const input = (
      <div>
        <h3>Introduction</h3>
        <p>hello there</p>
      </div>
    )

    const expected = h('div', [
      h('.h3-section', [
        h('h3', 'Introduction'),
        h('.body', [h('p', 'hello there')])
      ])
    ])

    const output = wrapH3(input)
    expect(render(output)).toEqual(render(expected))
  })
})

/*
 * Test wrapping all
 */

describe('wrapAll', () => {
  it('works with one h3', () => {
    const input = (
      <div>
        <h3>Introduction</h3>
        <p>hello there</p>
      </div>
    )

    const expected = h('div', [
      h('.h2-section', [
        h('.body.h3-section-list', [
          h('.h3-section', [
            h('h3', 'Introduction'),
            h('.body', [h('p', 'hello there')])
          ])
        ])
      ])
    ])

    const output = wrap(input)
    expect(render(output)).toEqual(render(expected))
  })

  it('works with an h2 and an h3', () => {
    const input = (
      <div>
        <h2>Intro</h2>
        <h3>Installation</h3>
        <p>(hello)</p>
        <h3>Usage</h3>
        <p>(world)</p>
      </div>
    )

    const expected = (
      <div>
        <div className="h2-section">
          <h2>Intro</h2>
          <div className="body h3-section-list">
            <div className="h3-section">
              <h3>Installation</h3>
              <div className="body">
                <p>(hello)</p>
              </div>
            </div>
            <div className="h3-section">
              <h3>Usage</h3>
              <div className="body">
                <p>(world)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    const output = wrap(input)
    expect(render(output)).toEqual(render(expected))
  })

  it('accounts for classes', () => {
    const input = (
      <div>
        <h2>Intro</h2>
        <h3 className="one">Installation</h3>
        <p>(hello)</p>
        <h3 className="two">Usage</h3>
        <p>(world)</p>
      </div>
    )

    const expected = (
      <div>
        <div className="h2-section">
          <h2>Intro</h2>
          <div className="body h3-section-list">
            <div className="h3-section one">
              <h3 className="one">Installation</h3>
              <div className="body one">
                <p>(hello)</p>
              </div>
            </div>
            <div className="h3-section two">
              <h3 className="two">Usage</h3>
              <div className="body two">
                <p>(world)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    const output = wrap(input)
    expect(render(output)).toEqual(render(expected))
  })

  it('custom sectionTag', () => {
    const input = (
      <div>
        <h2>Intro</h2>
        <h3 className="one">Installation</h3>
        <p>(hello)</p>
        <h3 className="two">Usage</h3>
        <p>(world)</p>
      </div>
    )

    const expected = (
      <div>
        <section className="h2-section">
          <h2>Intro</h2>
          <div className="body h3-section-list">
            <aside className="h3-section one">
              <h3 className="one">Installation</h3>
              <div className="body one">
                <p>(hello)</p>
              </div>
            </aside>
            <aside className="h3-section two">
              <h3 className="two">Usage</h3>
              <div className="body two">
                <p>(world)</p>
              </div>
            </aside>
          </div>
        </section>
      </div>
    )

    const output = wrap(input, {
      h2: { sectionTag: 'section' },
      h3: { sectionTag: 'aside' }
    })
    expect(render(output)).toEqual(render(expected))
  })
})
