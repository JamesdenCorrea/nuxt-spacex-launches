<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-6">
          <h1 class="text-h3">Favorite Rockets</h1>
          <v-btn
            v-if="favoritesStore.favorites.length > 0"
            @click="showClearDialog = true"
            color="error"
            prepend-icon="mdi-delete"
          >
            Clear All
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row v-if="favoritesStore.favorites.length === 0">
      <v-col cols="12">
        <v-card class="text-center pa-12" variant="outlined">
          <v-icon size="80" color="grey">mdi-heart-outline</v-icon>
          <h2 class="text-h5 mt-4 mb-2">No Favorites Yet</h2>
          <p class="text-body-1 text-grey mb-4">
            Start adding your favorite rockets from the launches page!
          </p>
          <v-btn to="/launches" color="primary" size="large">
            Browse Launches
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Favorites Grid -->
    <v-row v-else>
      <v-col
        v-for="favorite in favoritesStore.favorites"
        :key="favorite.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card hover>
          <v-card-title>{{ favorite.name }}</v-card-title>
          <v-card-text>
            <p><strong>Mission:</strong> {{ favorite.mission_name }}</p>
            <p><strong>First Flight:</strong> {{ formatDate(favorite.launch_date) }}</p>
          </v-card-text>
          <v-card-actions>
<v-btn
  :to="`/rockets/${favorite.id}`"
  color="primary"
  variant="text"
>
  View Details
            </v-btn>
            <v-spacer />
            <v-btn
              @click="favoritesStore.removeFavorite(favorite.id)"
              color="error"
              icon
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Clear All Dialog -->
    <v-dialog v-model="showClearDialog" max-width="400">
      <v-card>
        <v-card-title>Clear All Favorites?</v-card-title>
        <v-card-text>
          Are you sure you want to remove all {{ favoritesStore.favorites.length }} favorites?
          This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showClearDialog = false">Cancel</v-btn>
          <v-btn @click="clearAll" color="error">Clear All</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
const favoritesStore = useFavoritesStore()
const showClearDialog = ref(false)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const clearAll = () => {
  favoritesStore.clearFavorites()
  showClearDialog.value = false
}
</script>
