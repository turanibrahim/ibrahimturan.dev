export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Open+Sans&family=Oswald:wght@500&display=swap?family=Fira+Code&display=swap&family=Open+Sans&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/vuelidate',
    '~/plugins/vue-showdown'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
    '@nuxtjs/google-analytics'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Moment module configuration
   */
  moment: {
    defaultLocale: 'en',
    locales: ['tr']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },

  proxy: {
    '/api/': {
      target: 'http://localhost:80/api/',
      pathRewrite: { '^/api/': '' }
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#23314A',
          secondary: '#963D5A',
          accent: '#86BBD8',
          error: '#CC2936',
          warning: '#F4743B',
          info: '#FAB3A9',
          success: '#70AE6E',
          blockquoteGray: '#37474F'
        },
        light: {
          primary: '#23314A',
          secondary: '#963D5A',
          accent: '#86BBD8',
          error: '#CC2936',
          warning: '#F4743B',
          info: '#FAB3A9',
          success: '#70AE6E',
          blockquoteGray: '#CFD8DC'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  router: {
    middleware: 'i18n',
    extendRoutes(routes, resolve) {
      routes.push(
        {
          path: '/',
          component: resolve(__dirname, 'pages/_lang/About/index.vue'),
          name: 'home'
        },
        {
          path: '/tr',
          component: resolve(__dirname, 'pages/_lang/About/index.vue'),
          name: 'lang-Home'
        },
        {
          path: '/blog/post/:id',
          component: resolve(__dirname, 'pages/_lang/Blog/post.vue'),
          name: 'post'
        },
        {
          path: '/tr/blog/post/:id',
          component: resolve(__dirname, 'pages/_lang/Blog/post.vue'),
          name: 'lang-Post'
        }
      )
    }
  },
  env: {
    url: process.env.URL
  },
  googleAnalytics: {
    id: 'UA-169371621-1',
    debug: { sendHitTask: true }
  }
}
