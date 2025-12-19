import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  
  build: { 
    transpile: ['vuetify', '@apollo/client', '@vue/apollo-composable'] 
  },
  
  imports: { 
    dirs: ['./stores'] 
  },
  
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
        // Add these for better compatibility
        browserHttpEndpoint: 'https://api.spacex.land/graphql/',
        // Disable SSR fetch
        tokenStorage: 'cookie',
      },
    },
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  },
  
  vite: {
    optimizeDeps: {
      include: ['graphql-tag', '@apollo/client/core'],
    },
    plugins: [vuetify()],
    build: {
      chunkSizeWarningLimit: 1000,
    },
  },
  
  compatibilityDate: '2024-11-11',
  
  // Force client-only for GraphQL routes
  routeRules: {
    '/launches': { ssr: false },
    '/rockets/**': { ssr: false },
  },
  
  // Nitro preset for Vercel
  nitro: {
    preset: 'vercel',
  },
})
