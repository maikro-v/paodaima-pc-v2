import Vue from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow-night-eighties.css'

Vue.directive('highlight', (el) => {
  hljs.initHighlightingOnLoad()
  el.querySelectorAll('pre code')
    .forEach((block) => {
      hljs.highlightBlock(block)
    })
})
