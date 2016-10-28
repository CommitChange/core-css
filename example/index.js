// npm
import R from 'ramda'
import h from 'snabbdom/h'
import flyd from 'flyd'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'
import url$ from 'flyd-url'

import nav from './nav'

import about from './about'
import align from './align'
import background from './background'
import branding from './branding'
import blockquote from './blockquote'
import border from './border'
import button from './button'
import color from './color'
import cursor from './cursor'
import form from './form'
import grid from './grid'
import helpBox from './help-box'
import hide from './hide'
import layout from './layout'
import list from './list'
import opacity from './opacity'
import margin from './margin'
import misc from './misc'
import padding from './padding'
import position from './position'
import progressBar from './progress-bar'
import shadow from './shadow'
import table from './table'
import tabs from './tabs'
import typeScale from './type-scale'
import typography from './typography'

window.log = (text, $) => flyd.map(x => console.log(text, x), $)

const init = _ => {
  return {
    ID$: flyd.map(x => {
      if(x.hash) {
        return x.hash.replace('#', '')
      }
      if(x.search) {
        return x.search.split('=')[1]
      }
    }, url$)
  }
}

const scroll = ID$ => v => {
  const main = v.elm.querySelector('.main')  
  const sectionsData = R.map(x => ({top: x.offsetTop, id: x.id}), main.querySelectorAll('section'))

  main.addEventListener('scroll', _ => {
    let scrollTop = main.scrollTop
    R.reduce((a, b) => {
      if(scrollTop >= a.top && scrollTop <= b.top & ID$ != a.id) {
        window.history.pushState('', 'section', `?section=${a.id}`)
      }
      return b
    }, {}, sectionsData)
  })

  window.location.hash = ID$()
}


const view = state => 
  h('div.relative', {hook: {insert: scroll(state.ID$)}}, [
    nav(state)
  , h('div.main.px-3', [
      about()
    , align()
    , background()
    , branding()
    , blockquote()
    , border()
    , button()
    , color()
    , cursor()
    , form()
    , grid()
    , helpBox()
    , hide()
    , layout()
    , list()
    , margin()
    , misc()
    , opacity()
    , padding()
    , position()
    , progressBar()
    , shadow()
    , table()
    , tabs()
    , typeScale()
    , typography()
    ])
  ])

let container = document.querySelector('#container')

const patch = snabbdom.init([
  require('snabbdom/modules/class')
, require('snabbdom/modules/props')
, require('snabbdom/modules/style')
, require('snabbdom/modules/eventlisteners')
, require('snabbdom/modules/attributes')
])

render({patch, container, view, state: init()})

