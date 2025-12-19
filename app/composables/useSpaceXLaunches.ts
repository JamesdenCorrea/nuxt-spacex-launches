import { useQuery } from '@vue/apollo-composable'
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

  // Only run query on client
  const enabled = computed(() => process.client)

  const { result, loading, error, refetch } = useQuery(
    GET_LAUNCHES,
    {},
    () => ({
      enabled: enabled.value,
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    })
  )

  const launches = computed(() => {
    const data = result.value?.launchesPast ?? []
    
    // Debug logging
    if (process.client) {
      console.log('📊 Query result:', result.value)
      console.log('✅ Launches count:', data.length)
      if (data.length > 0) {
        console.log('🚀 Sample launch:', data[0])
      }
      if (error.value) {
        console.error('❌ Query error:', error.value)
      }
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
