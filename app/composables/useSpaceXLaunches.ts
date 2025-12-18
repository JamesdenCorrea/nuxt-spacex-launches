// app/composables/useSpaceXLaunches.ts
import { useQuery } from '#imports'
import gql from 'graphql-tag'
import { computed } from 'vue'

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

  // Only fetch on client to avoid SSR issues
  const enabled = process.client

  const { result, loading, error, refetch } = useQuery(
    GET_LAUNCHES,
    {},
    () => ({
      fetchPolicy: 'network-only', // always fetch fresh data
      enabled,                      // only fetch on client
    })
  )

  // Computed launches list
  const launches = computed(() => {
    const data = result.value?.launchesPast ?? []

    // Optional: debug log
    if (data.length > 0 && process.client) {
      console.log('🔄 Sample launch:', data[0])
      console.log('Rocket ID:', data[0].rocket?.rocket?.id)
    }

    return data
  })

  return { launches, loading, error, refetch }
}
