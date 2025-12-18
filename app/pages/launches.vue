<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-6">SpaceX Launches</h1>
      </v-col>
    </v-row>

    <ClientOnly>
      <LaunchesContent />
      <template #fallback>
        <v-row justify="center">
          <v-col cols="12" class="text-center py-12">
            <v-progress-circular indeterminate size="64" color="primary" />
            <p class="mt-4 text-h6">Loading launches...</p>
          </v-col>
        </v-row>
      </template>
    </ClientOnly>
  </v-container>
</template>

<script setup lang="ts">
const { launches, loading, error } = useSpaceXLaunches()

const formatDate = (date: string) => {
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (e) {
    return date
  }
}

// Debug watch
watch(launches, (newVal) => {
  console.log('🔄 Launches updated:', newVal.length)
}, { immediate: true })
</script>