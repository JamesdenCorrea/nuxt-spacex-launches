import gql from 'graphql-tag'

export const useSpaceXLaunches = () => {
  const GET_LAUNCHES = gql`
    query GetLaunches {
      launchesPast(limit: 100) {
        id
        mission_name
        launch_date_local
        launch_site {
          site_name
        }
        rocket {
          rocket_name
          rocket {
            id
            name
          }
        }
        details
        links {
          mission_patch_small
        }
      }
    }
  `


  const enabled = ref(process.client)

  const { result, loading, error, refetch } = useQuery(
    GET_LAUNCHES,
    {},
    () => ({
      enabled: enabled.value,
      fetchPolicy: 'network-only',
    })
  )

  const launches = computed(() => {
    const data = result.value?.launchesPast ?? []
    // Debug: Check the structure
    if (data.length > 0) {
      console.log('Sample launch data:', data[0])
      console.log('Rocket ID:', data[0].rocket?.rocket?.id)
    }
    return data
  })

  return {
    launches,
    loading,
    error,
    refetch
  }
}