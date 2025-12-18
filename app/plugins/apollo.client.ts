import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
import { provideApolloClient } from '@vue/apollo-composable'

export default defineNuxtPlugin(() => {
  const httpLink = new HttpLink({
    uri: 'https://spacex-production.up.railway.app/',
  })

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    ssrMode: false,
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  })

  provideApolloClient(apolloClient)
  
  return {
    provide: {
      apolloClient
    }
  }
})