import hljs from 'highlight.js'

const langs = ['javascript', 'css', 'less', 'scss', 'stylus', 'nginx', 'xml', 'htmlbars', 'bash', 'json', 'http', 'sql', 'markdown']

langs.forEach((ele) => {
  hljs.registerLanguage(ele, require(`highlight.js/lib/languages/${ele}`))
})
