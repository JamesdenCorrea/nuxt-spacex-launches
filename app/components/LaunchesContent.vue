<template>
  <div>
    <!-- Loading State -->
    <v-row v-if="loading" justify="center">
      <v-col cols="12" class="text-center py-12">
        <v-progress-circular indeterminate size="64" color="primary" />
        <p class="mt-4 text-h6">Loading launches...</p>
      </v-col>
    </v-row>

    <!-- Error State -->
    <v-row v-else-if="error">
      <v-col cols="12">
        <v-alert type="error" prominent border="start">
          <v-alert-title class="text-h6">Error Loading Launches</v-alert-title>
          <div class="mt-2">{{ error.message }}</div>
          <template #append>
            <v-btn @click="refetch" variant="outlined">
              Retry
            </v-btn>
          </template>
        </v-alert>
      </v-col>
    </v-row>

    <!-- Success State with Filter & Sort -->
    <div v-else>
      <!-- Filter and Sort Controls -->
      <v-row class="mb-4">
        <v-col cols="12" md="4">
          <v-select
            v-model="selectedYear"
            :items="years"
            label="Filter by Year"
            prepend-inner-icon="mdi-filter"
            variant="outlined"
            density="comfortable"
          />
        </v-col>
        
        <v-col cols="12" md="4">
          <v-btn
            @click="toggleSort"
            variant="outlined"
            block
            height="56"
            prepend-icon="mdi-sort"
          >
            Sort: {{ sortOrder === 'asc' ? 'Oldest First' : 'Newest First' }}
          </v-btn>
        </v-col>

        <v-col cols="12" md="4" class="d-flex align-center">
          <v-chip color="primary" variant="elevated">
            <v-icon start>mdi-rocket-launch</v-icon>
            {{ displayedLaunches.length }} Launches
          </v-chip>
        </v-col>
      </v-row>

      <!-- Empty State -->
      <v-row v-if="displayedLaunches.length === 0">
        <v-col cols="12">
          <v-alert type="info" variant="tonal">
            No launches found for the selected filter.
          </v-alert>
        </v-col>
      </v-row>

      <!-- Launch Cards Grid -->
      <v-row v-else>
        <v-col
          v-for="launch in displayedLaunches"
          :key="launch.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
<LaunchCard
  :launch="launch"
  :is-favorite="isLaunchFavorite(launch)"
  @toggle-favorite="handleToggleFavorite"
/>


        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
const { launches, loading, error, refetch } = useSpaceXLaunches()
const { selectedYear, years, filteredLaunches } = useLaunchFilter(launches)
const { sortOrder, sortedLaunches, toggleSort } = useLaunchSort(filteredLaunches)

const favoritesStore = useFavoritesStore()

const displayedLaunches = sortedLaunches

const isLaunchFavorite = (launch: any) => {
  return favoritesStore.isFavorite(launch.id)
}


const handleToggleFavorite = ({ launchId, launch }: any) => {
  if (favoritesStore.isFavorite(launchId)) {
    favoritesStore.removeFavorite(launchId)
  } else {
    favoritesStore.addFavorite({
      id: launchId,
      mission_name: launch.mission_name,
      launch_date: launch.launch_date_local,
      rocket_name:
        launch.rocket?.rocket?.name ||
        launch.rocket?.rocket_name ||
        'Unknown',
    })
  }
}


onMounted(() => {
  console.log('✅ Launches loaded:', launches.value.length)
})
</script>
