module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'maikro技术博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'maikro,maikro技术博客,迈克,迈克技术博客,博客,前端博客,前端教程,前端开发,前端技术,web前端,javascript,jquery,css,html,vue,react,nodejs' },
      { hid: 'description', name: 'description', content: 'maikro技术博客，致力于分享前端学习路上的第一手资料，专注于Web开发，移动端开发、混合应用开发、前端自动化、前端工程化、NodeJs' },
      { name: 'baidu-site-verification', content: 'oqg7LFN6Zw' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#6e88f9',
    height: '3px'
  },
  /*
  ** Global CSS
  */
  css: [
    '@/styles/element.scss',
    '@/styles/index.scss',
    'animate.css'
  ],
  styleResources: {
    scss: './styles/global.scss'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    '@/plugins/router',
    { src: '@/plugins/vue-mavon-editor', srr: false },
    { src: '@/plugins/vue-cropper', ssr: false },
    { src: '@/plugins/particles', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true // Can be also an object with default options
  },
  /**
   * 跨域处理
   */
  proxy: {
    '/api': 'http://maikro.cn'
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  }
}
