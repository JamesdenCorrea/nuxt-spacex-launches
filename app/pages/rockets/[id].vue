<template>
  <v-container>
    <ClientOnly>
      <div>
        <!-- Loading State -->
        <v-row v-if="loading" justify="center">
          <v-col cols="12" class="text-center py-12">
            <v-progress-circular indeterminate size="64" color="primary" />
            <p class="mt-4 text-h6">Loading rocket details...</p>
          </v-col>
        </v-row>

        <!-- Error State -->
        <v-row v-else-if="error">
          <v-col cols="12">
            <v-alert type="error" prominent>
              <v-alert-title>Error Loading Rocket</v-alert-title>
              {{ error.message }}
            </v-alert>
            <v-btn to="/launches" class="mt-4" color="primary">
              Back to Launches
            </v-btn>
          </v-col>
        </v-row>

        <!-- Rocket Details -->
        <div v-else-if="rocket">
          <!-- Header -->
          <v-row class="mb-6">
            <v-col cols="12">
              <div class="d-flex justify-space-between align-center">
                <div>
                  <h1 class="text-h3 mb-2">{{ rocket.name }}</h1>
                  <v-chip
                    :color="rocket.active ? 'success' : 'grey'"
                    size="small"
                    class="mr-2"
                  >
                    {{ rocket.active ? 'Active' : 'Inactive' }}
                  </v-chip>
                  <v-chip size="small">{{ rocket.country }}</v-chip>
                </div>
                <v-btn
                  :color="isFavorite ? 'error' : 'primary'"
                  :variant="isFavorite ? 'elevated' : 'outlined'"
                  @click="toggleFavorite"
                  size="large"
                >
                  <v-icon start>
                    {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
                  </v-icon>
                  {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
                </v-btn>
              </div>
            </v-col>
          </v-row>

          <!-- Description Card -->
          <v-row>
            <v-col cols="12">
              <v-card class="mb-6">
                <v-card-title>Description</v-card-title>
                <v-card-text>
                  <p class="text-body-1">{{ rocket.description }}</p>
                  <div class="mt-4">
                    <v-chip class="mr-2" prepend-icon="mdi-office-building">
                      {{ rocket.company }}
                    </v-chip>
                    <v-btn
                      v-if="rocket.wikipedia"
                      :href="rocket.wikipedia"
                      target="_blank"
                      variant="text"
                      prepend-icon="mdi-wikipedia"
                    >
                      Wikipedia
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Specifications Grid -->
          <v-row>
            <!-- First Flight -->
            <v-col cols="12" md="6" lg="4">
              <v-card>
                <v-card-text>
                  <div class="d-flex align-center mb-2">
                    <v-icon color="primary" class="mr-2">mdi-calendar-star</v-icon>
                    <span class="text-h6">First Flight</span>
                  </div>
                  <p class="text-h5 font-weight-bold">
                    {{ formatDate(rocket.first_flight) }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Height -->
            <v-col cols="12" md="6" lg="4">
              <v-card>
                <v-card-text>
                  <div class="d-flex align-center mb-2">
                    <v-icon color="primary" class="mr-2">mdi-arrow-up-bold</v-icon>
                    <span class="text-h6">Height</span>
                  </div>
                  <p class="text-h5 font-weight-bold">
                    {{ rocket.height?.meters }} m
                  </p>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Diameter -->
            <v-col cols="12" md="6" lg="4">
              <v-card>
                <v-card-text>
                  <div class="d-flex align-center mb-2">
                    <v-icon color="primary" class="mr-2">mdi-diameter</v-icon>
                    <span class="text-h6">Diameter</span>
                  </div>
                  <p class="text-h5 font-weight-bold">
                    {{ rocket.diameter?.meters }} m
                  </p>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Mass -->
            <v-col cols="12" md="6" lg="4">
              <v-card>
                <v-card-text>
                  <div class="d-flex align-center mb-2">
                    <v-icon color="primary" class="mr-2">mdi-weight</v-icon>
                    <span class="text-h6">Mass</span>
                  </div>
                  <p class="text-h5 font-weight-bold">
                    {{ formatNumber(rocket.mass?.kg) }} kg
                  </p>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Stages -->
            <v-col cols="12" md="6" lg="4">
              <v-card>
                <v-card-text>
                  <div class="d-flex align-center mb-2">
                    <v-icon color="primary" class="mr-2">mdi-layers</v-icon>
                    <span class="text-h6">Number of Stages</span>
                  </div>
                  <p class="text-h5 font-weight-bold">
                    {{ rocket.stages }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Cost per Launch -->
            <v-col cols="12" md="6" lg="4">
              <v-card>
                <v-card-text>
                  <div class="d-flex align-center mb-2">
                    <v-icon color="primary" class="mr-2">mdi-currency-usd</v-icon>
                    <span class="text-h6">Cost per Launch</span>
                  </div>
                  <p class="text-h5 font-weight-bold">
                    ${{ formatNumber(rocket.cost_per_launch) }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Success Rate -->
            <v-col cols="12" md="6" lg="4">
              <v-card>
                <v-card-text>
                  <div class="d-flex align-center mb-2">
                    <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
                    <span class="text-h6">Success Rate</span>
                  </div>
                  <p class="text-h5 font-weight-bold">
                    {{ rocket.success_rate_pct }}%
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Back Button -->
          <v-row class="mt-6">
            <v-col cols="12">
              <v-btn to="/launches" prepend-icon="mdi-arrow-left" size="large">
                Back to Launches
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>

      <template #fallback>
        <v-row justify="center">
          <v-col cols="12" class="text-center py-12">
            <v-progress-circular indeterminate size="64" />
            <p class="mt-4">Loading...</p>
          </v-col>
        </v-row>
      </template>
    </ClientOnly>
  </v-container>
</template>

<script setup lang="ts">
const route = useRoute()
const rocketId = computed(() => route.params.id as string)

const { rocket, loading, error } = useSpaceXRocket(rocketId)
const favoritesStore = useFavoritesStore()

const isFavorite = computed(() => {
  return rocket.value ? favoritesStore.isFavorite(rocket.value.id) : false
})

const toggleFavorite = () => {
  if (!rocket.value) return

  if (isFavorite.value) {
    favoritesStore.removeFavorite(rocket.value.id)
  } else {
    favoritesStore.addFavorite({
      id: rocket.value.id,
      name: rocket.value.name,
      mission_name: `${rocket.value.name} Rocket`,
      launch_date: rocket.value.first_flight,
    })
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatNumber = (num: number) => {
  return num?.toLocaleString('en-US')
}
</script>