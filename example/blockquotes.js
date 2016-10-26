import h from 'snabbdom/h'
import title from './title'
import section from './section'

module.exports = _ => {
  const content = h('div', [
    title('Blockquotes')
  , h('blockquote', 'Mic check, mic check... one, two, three')
  ])
  return section ('blockquotes', content)
}