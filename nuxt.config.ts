import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  build: { transpile: ['vuetify'] },
  imports: { dirs: ['./stores'] },

  modules: [
    '@nuxtjs/apollo',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }],
  ],

  apollo: {
    autoImports: true,
    proxyCookies: false,
    cookieAttributes: { secure: false },
    clients: {
      default: {
        httpEndpoint: 'https://api.spacex.land/graphql/',
      },
    },
    // Use correct property name
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only', // always fetch fresh data
      },
    },
  },

  vite: {
    optimizeDeps: {
      include: ['graphql-tag'],
    },
    plugins: [vuetify()],
  },

  compatibilityDate: '2024-11-11',
  ssr: true,
})

