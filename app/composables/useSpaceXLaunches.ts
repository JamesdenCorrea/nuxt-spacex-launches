import { useQuery } from '#imports'
import gql from 'graphql-tag'
import { ref, computed } from 'vue'

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

  // Only enable query on client-side
  const enabled = ref(false)

  if (process.client) enabled.value = true

  const { result, loading, error, refetch } = useQuery(
    GET_LAUNCHES,
    {},
    () => ({
      enabled: enabled.value,       // <-- Only fetch on client
      fetchPolicy: 'network-only',  // always fetch fresh data
    })
  )

  const launches = computed(() => result.value?.launchesPast ?? [])

  return { launches, loading, error, refetch }
}

