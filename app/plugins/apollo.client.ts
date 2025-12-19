import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
import { provideApolloClient } from '@vue/apollo-composable'

export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client side
  if (process.server) return

  const httpLink = new HttpLink({
    uri: 'https://api.spacex.land/graphql/', // Match nuxt.config.ts
    fetch: fetch,
  })

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    ssrMode: false,
    connectToDevTools: false, // Fix the warning
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  })

  provideApolloClient(apolloClient)
  
  nuxtApp.provide('apollo', apolloClient)
})