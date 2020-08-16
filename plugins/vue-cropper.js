import Vue from 'vue'

if (process.browser) {
  const vueCropper = require('vue-cropper')
  Vue.use(vueCropper.default)
}
