<template>
  <v-container>
    <h1>Debug: Rocket IDs</h1>
    
    <ClientOnly>
      <div v-if="loading">Loading...</div>
      <div v-else-if="launches.length > 0">
        <v-card v-for="launch in launches.slice(0, 10)" :key="launch.id" class="mb-2">
          <v-card-text>
            <p><strong>Mission:</strong> {{ launch.mission_name }}</p>
            <p><strong>Rocket Name:</strong> {{ launch.rocket?.rocket_name }}</p>
            <p><strong>Rocket ID:</strong> {{ launch.rocket?.rocket?.id }}</p>
            <p><strong>Rocket Object:</strong></p>
            <pre style="font-size: 11px">{{ JSON.stringify(launch.rocket, null, 2) }}</pre>
          </v-card-text>
        </v-card>
      </div>
    </ClientOnly>
  </v-container>
</template>

<script setup lang="ts">
const { launches, loading } = useSpaceXLaunches()
</script>
```

**Visit:** http://localhost:3000/test-rocket-ids

**Expected Output:**
```
Mission: FalconSat
Rocket Name: Falcon 1
Rocket ID: falcon1

Mission: Starlink-15
Rocket Name: Falcon 9
Rocket ID: falcon9
```

### **Debug Step 2: Test Direct Rocket URL**

Try accessing these URLs directly:
```
http://localhost:3000/rockets/falcon1
http://localhost:3000/rockets/falcon9
http://localhost:3000/rockets/falconheavy