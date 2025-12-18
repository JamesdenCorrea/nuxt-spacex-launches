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
    proxyCookies: false, // updated from your previous true
    cookieAttributes: { secure: false },
    clients: {
      default: {
        httpEndpoint: 'https://api.spacex.land/graphql/',
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
