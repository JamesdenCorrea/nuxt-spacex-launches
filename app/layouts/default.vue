<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
        class="d-lg-none"
      />
      
      <v-toolbar-title class="text-h5 font-weight-bold">
        <v-icon size="large" class="mr-2">mdi-rocket-launch</v-icon>
        SpaceX Explorer
      </v-toolbar-title>

      <v-spacer />

      <!-- Desktop Navigation -->
      <div class="d-none d-lg-flex">
        <v-btn
          to="/"
          variant="text"
          prepend-icon="mdi-home"
        >
          Home
        </v-btn>
        <v-btn
          to="/launches"
          variant="text"
          prepend-icon="mdi-rocket"
        >
          Launches
        </v-btn>
        <v-btn
          to="/favorites"
          variant="text"
          prepend-icon="mdi-heart"
        >
          Favorites
          <v-badge
            v-if="favoritesStore.favorites.length > 0"
            :content="favoritesStore.favorites.length"
            color="error"
            inline
          />
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      class="d-lg-none"
    >
      <v-list>
        <v-list-item
          prepend-icon="mdi-home"
          title="Home"
          to="/"
          @click="drawer = false"
        />
        <v-list-item
          prepend-icon="mdi-rocket"
          title="Launches"
          to="/launches"
          @click="drawer = false"
        />
        <v-list-item
          prepend-icon="mdi-heart"
          title="Favorites"
          to="/favorites"
          @click="drawer = false"
        >
          <template #append>
            <v-badge
              v-if="favoritesStore.favorites.length > 0"
              :content="favoritesStore.favorites.length"
              color="error"
            />
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <slot />
    </v-main>

    <!-- Footer -->
    <v-footer app class="bg-grey-lighten-3">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6" class="text-center text-md-left">
            <p class="mb-0">
              © {{ currentYear }} SpaceX Explorer | Built with Nuxt 3 & Vuetify
            </p>
          </v-col>
          <v-col cols="12" md="6" class="text-center text-md-right">
            <v-btn
              href="https://github.com/stephenjason89/nuxt-vuetify-graphql-pinia-starter"
              target="_blank"
              variant="text"
              size="small"
              prepend-icon="mdi-github"
            >
              View Source
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
const drawer = ref(false)
const favoritesStore = useFavoritesStore()
const currentYear = new Date().getFullYear()
</script>
