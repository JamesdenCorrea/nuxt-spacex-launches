<template>
  <v-container>
    <v-row align="center" justify="center" style="min-height: 80vh">
      <v-col cols="12" md="8" class="text-center">
        <v-icon size="120" color="primary">mdi-rocket-launch</v-icon>
        <h1 class="text-h2 mt-6 mb-4">SpaceX Explorer</h1>
        <p class="text-h6 text-grey mb-8">
          Explore SpaceX launches, rockets, and missions using GraphQL
        </p>
        <v-row justify="center">
          <v-col cols="12" sm="6" md="4">
            <v-btn
              to="/launches"
              color="primary"
              size="x-large"
              block
              prepend-icon="mdi-rocket"
            >
              View Launches
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-btn
              to="/favorites"
              variant="outlined"
              size="x-large"
              block
              prepend-icon="mdi-heart"
            >
              My Favorites
            </v-btn>
          </v-col>
        </v-row>

        <!-- Feature Cards -->
        <v-row class="mt-12">
          <v-col cols="12" md="4">
            <v-card>
              <v-card-text class="text-center">
                <v-icon size="48" color="primary">mdi-filter</v-icon>
                <h3 class="text-h6 mt-3">Filter by Year</h3>
                <p class="text-body-2">Filter launches by year</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-text class="text-center">
                <v-icon size="48" color="primary">mdi-sort</v-icon>
                <h3 class="text-h6 mt-3">Sort Launches</h3>
                <p class="text-body-2">Sort by date ascending or descending</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-text class="text-center">
                <v-icon size="48" color="primary">mdi-heart</v-icon>
                <h3 class="text-h6 mt-3">Save Favorites</h3>
                <p class="text-body-2">Keep track of your favorite rockets</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>