<template>
  <v-container>
    <h1>Home</h1>
    <v-divider style="padding-bottom: 10px"></v-divider>
    <v-btn href="/vehicles" value="vehicles">
      <span>Vehicles</span>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
});
</script>
