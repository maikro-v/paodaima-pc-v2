
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
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/page-loading',
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
    '@/plugins/highlight',
    { src: '@/plugins/vue-mavon-editor', srr: false }
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
    publicPath: '/static',
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
