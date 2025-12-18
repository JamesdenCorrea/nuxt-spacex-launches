<template>
  <v-card hover class="h-100">
    <v-img
      v-if="launch.links?.mission_patch_small"
      :src="launch.links.mission_patch_small"
      height="200"
      cover
    />
    <v-card-title class="text-h6">
      {{ launch.mission_name }}
    </v-card-title>
    
    <v-card-text>
      <div class="mb-2">
        <v-icon size="small" class="mr-2">mdi-calendar</v-icon>
        <strong>Date:</strong> {{ formatDate(launch.launch_date_local) }}
      </div>
      
      <div class="mb-2">
        <v-icon size="small" class="mr-2">mdi-map-marker</v-icon>
        <strong>Site:</strong> {{ launch.launch_site?.site_name || 'N/A' }}
      </div>
      
      <div class="mb-2">
        <v-icon size="small" class="mr-2">mdi-rocket</v-icon>
        <strong>Rocket:</strong> {{ launch.rocket?.rocket_name || launch.rocket?.rocket?.name || 'N/A' }}
      </div>
      
      <div v-if="launch.details" class="mt-3">
        <v-divider class="mb-2" />
        <p class="text-body-2 text-grey-darken-1">
          {{ truncateText(launch.details, 120) }}
        </p>
      </div>
    </v-card-text>
    
    <v-card-actions>
<v-btn
  v-if="rocketId"
  :to="`/rockets/${rocketId}`"
  color="primary"
  variant="text"
>
  View Rocket
</v-btn>
      
      <v-spacer />
      
<v-btn
  :color="isFavorite ? 'error' : 'grey'"
  icon
  @click.stop="handleToggle"
>
  <v-icon>
    {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
  </v-icon>
</v-btn>

    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
interface Launch {
  id: string
  mission_name: string
  launch_date_local: string
  launch_site?: { site_name: string }
  rocket?: {
    rocket_name: string
    rocket?: {
      id: string
      name?: string
    }
  }
  details?: string
  links?: { mission_patch_small?: string }
}

interface Props {
  launch: Launch
  isFavorite: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'toggle-favorite', payload: { launchId: string; launch: Launch }): void
}>()

const launchId = computed(() => props.launch.id)
const rocketId = computed(() => {
  return props.launch.rocket?.rocket?.id || null
})



const handleToggle = () => {
  emit('toggle-favorite', {
    launchId: launchId.value,
    launch: props.launch,
  })
}


const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

const truncateText = (text: string, length: number) =>
  text.length > length ? text.slice(0, length) + '...' : text
</script>
