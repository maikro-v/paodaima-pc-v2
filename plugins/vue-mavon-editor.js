import Vue from 'vue'
import hljs from 'highlight.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'github-markdown-css'
import 'highlight.js/styles/monokai.css'

Vue.use(mavonEditor)

mavonEditor.markdownIt.options.highlight = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return `<pre class="custom"><code class="hljs">${hljs.highlight(lang, str, true).value}</code></pre>`
    } catch (__) {}
  }
  return '<pre><code class="hljs">' + mavonEditor.markdownIt.utils.escapeHtml(str) + '</code></pre>' // 使用额外的默认转义
}
