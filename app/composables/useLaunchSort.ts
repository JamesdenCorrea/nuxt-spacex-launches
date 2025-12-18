export const useLaunchSort = (launches: Ref<any[]>) => {
  const sortOrder = ref<'asc' | 'desc'>('desc')
  
  const sortedLaunches = computed(() => {
    return [...launches.value].sort((a, b) => {
      const dateA = new Date(a.launch_date_local).getTime()
      const dateB = new Date(b.launch_date_local).getTime()
      
      return sortOrder.value === 'asc' 
        ? dateA - dateB 
        : dateB - dateA
    })
  })
  
  const toggleSort = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }
  
  return {
    sortOrder,
    sortedLaunches,
    toggleSort
  }
}