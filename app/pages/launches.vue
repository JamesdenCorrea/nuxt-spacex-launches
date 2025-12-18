<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-6">SpaceX Launches</h1>
      </v-col>
    </v-row>

    <ClientOnly>
      <v-row>
        <!-- Loading fallback -->
        <template v-if="loading">
          <v-col cols="12" class="text-center py-12">
            <v-progress-circular indeterminate size="64" color="primary" />
            <p class="mt-4 text-h6">Loading launches...</p>
          </v-col>
        </template>

        <!-- Error message -->
        <template v-else-if="error">
          <v-col cols="12" class="text-center py-12">
            <p class="text-h6 text-error">
              Error loading launches. Please try again later.
            </p>
          </v-col>
        </template>

        <!-- Render launches -->
        <template v-else>
          <v-col
            v-for="launch in launches"
            :key="launch.id"
            cols="12"
            md="4"
          >
            <LaunchCard
              :launch="launch"
              :isFavorite="favoritesStore.isFavorite(launch.id)"
              @toggle-favorite="handleToggleFavorite"
            />
          </v-col>
        </template>
      </v-row>
    </ClientOnly>
  </v-container>
</template>

<script setup lang="ts">
import { useSpaceXLaunches } from '~/composables/useSpaceXLaunches'
import { useFavoritesStore } from '~/stores/favorites'
import { watch } from 'vue'

// Composables
const { launches, loading, error } = useSpaceXLaunches()
const favoritesStore = useFavoritesStore()

// Handle toggling favorites
const handleToggleFavorite = (payload: { launchId: string; launch: any }) => {
  if (favoritesStore.isFavorite(payload.launchId)) {
    favoritesStore.removeFavorite(payload.launchId)
  } else {
    favoritesStore.addFavorite({
      id: payload.launch.id,
      mission_name: payload.launch.mission_name,
      launch_date: payload.launch.launch_date_local,
      rocket_name: payload.launch.rocket?.rocket_name || payload.launch.rocket?.rocket?.name || 'N/A'
    })
  }
}

// Optional: helper function for formatting dates
const formatDate = (date: string) => {
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return date
  }
}

// Debug: watch launches updates
watch(launches, (newVal) => {
  console.log('🔄 Launches updated:', newVal.length)
}, { immediate: true })
</script>
