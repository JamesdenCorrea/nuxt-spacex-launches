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

  const { result, loading, error, refetch } = useQuery(GET_LAUNCHES, {}, {
    fetchPolicy: 'network-only', // always fetch fresh data
  })

  const launches = computed(() => result.value?.launchesPast ?? [])

  return { launches, loading, error, refetch }
}
