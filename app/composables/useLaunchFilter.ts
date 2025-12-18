export const useLaunchFilter = (launches: Ref<any[]>) => {
  const selectedYear = ref<string>('all')
  
  const years = computed(() => {
    const uniqueYears = new Set(
      launches.value.map(launch => {
        const date = new Date(launch.launch_date_local)
        return date.getFullYear().toString()
      })
    )
    
    return ['all', ...Array.from(uniqueYears).sort((a, b) => {
      if (a === 'all') return -1
      if (b === 'all') return 1
      return parseInt(b) - parseInt(a)
    })]
  })
  
  const filteredLaunches = computed(() => {
    if (selectedYear.value === 'all') {
      return launches.value
    }
    
    return launches.value.filter(launch => {
      const year = new Date(launch.launch_date_local).getFullYear().toString()
      return year === selectedYear.value
    })
  })
  
  return {
    selectedYear,
    years,
    filteredLaunches
  }
}