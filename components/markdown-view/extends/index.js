export default (md) => {
  md.use(require('markdown-it-sup')) // 上标
  md.use(require('markdown-it-footnote')) // 脚注
  md.use(require('markdown-it-container')) // 脚注
}
