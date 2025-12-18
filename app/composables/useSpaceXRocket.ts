import gql from 'graphql-tag'

export const useSpaceXRocket = (rocketId: string | Ref<string>) => {
  const GET_ROCKET = gql`
    query GetRocket($id: ID!) {
      rocket(id: $id) {
        id
        name
        description
        first_flight
        height {
          meters
        }
        diameter {
          meters
        }
        mass {
          kg
        }
        stages
        cost_per_launch
        success_rate_pct
        active
        country
        company
        wikipedia
      }
    }
  `

  const enabled = ref(process.client)
  const id = unref(rocketId)

  console.log('🚀 Querying rocket with ID:', id)

  const { result, loading, error } = useQuery(
    GET_ROCKET,
    { id },
    () => ({
      enabled: enabled.value && !!id,
      fetchPolicy: 'network-only',
    })
  )

  const rocket = computed(() => {
    console.log('Rocket result:', result.value)
    return result.value?.rocket
  })

  // Watch for errors
  watch(error, (newError) => {
    if (newError) {
      console.error('Rocket query error:', newError)
    }
  })

  return {
    rocket,
    loading,
    error
  }
}