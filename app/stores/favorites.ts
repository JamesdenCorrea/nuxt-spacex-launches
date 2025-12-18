import { defineStore } from 'pinia'

export interface FavoriteLaunch {
  id: string
  mission_name: string
  launch_date: string
  rocket_name: string
}

export const useFavoritesStore = defineStore('favorites', () => {
  const favoritesMap = ref<Record<string, FavoriteLaunch>>({})

  const addFavorite = (launch: FavoriteLaunch) => {
    favoritesMap.value[launch.id] = launch
  }

  const removeFavorite = (launchId: string) => {
    delete favoritesMap.value[launchId]
  }

  const isFavorite = (launchId: string): boolean => {
    return !!favoritesMap.value[launchId]
  }

  const clearFavorites = () => {
    favoritesMap.value = {}
  }

  const favorites = computed(() => Object.values(favoritesMap.value))

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
  }
})

