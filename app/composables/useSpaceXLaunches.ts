// app/composables/useSpaceXLaunches.ts
import { useQuery } from '#imports'
import gql from 'graphql-tag'
import { computed, ref } from 'vue'
import type { ApolloError } from '@apollo/client/core'

export const useSpaceXLaunches = () => {
  const GET_LAUNCHES = gql`
    query GetLaunches {
      launchesPast(limit: 100) {
        id
        mission_name
        launch_date_local
        launch_site { site_name }
        rocket { rocket_name rocket { id name } }
        details
        links { mission_patch_small }
      }
    }
  `

  // SSR-safe: initialize refs with proper types
  let result = ref<any>(null)
  let loading = ref<boolean>(false)
  let error = ref<ApolloError | null>(null)
  let refetch: (() => void) = () => {}

  if (process.client) {
    const queryResult = useQuery(GET_LAUNCHES, {}, { fetchPolicy: 'network-only' })
    result = queryResult.result
    loading = queryResult.loading
    error = queryResult.error
    refetch = queryResult.refetch
  }

  const launches = computed(() => result.value?.launchesPast ?? [])

  return { launches, loading, error, refetch }
}
