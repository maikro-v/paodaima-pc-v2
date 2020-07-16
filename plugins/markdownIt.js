import hljs from 'highlight.js' // https://highlightjs.org/
import 'highlight.js/styles/monokai.css'

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
hljs.registerLanguage('less', require('highlight.js/lib/languages/less'))
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
hljs.registerLanguage('stylus', require('highlight.js/lib/languages/stylus'))
hljs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'))
hljs.registerLanguage('html', require('highlight.js/lib/languages/xml'))
hljs.registerLanguage('htmlbars', require('highlight.js/lib/languages/htmlbars'))
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
hljs.registerLanguage('http', require('highlight.js/lib/languages/http'))
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'))
hljs.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'))

const defaults = {
  html: true,
  linkify: true,
  typographer: true
}

defaults.highlight = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return `<pre class="custom"><code class="hljs">${hljs.highlight(lang, str, true).value}</code></pre>`
    } catch (__) {}
  }
  return '' // 使用额外的默认转义
}

const md = require('markdown-it')(defaults)

export default ({ app }, inject) => {
  inject('md', md)
}
