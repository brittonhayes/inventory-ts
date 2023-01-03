<template>
  <v-data-table :headers="headers" :items="vehicles">
    <template v-slot:items="vehicles">
      <td class="text-xs-right">{{ vehicles.name }}</td>
      <td class="text-xs-right">{{ vehicles.make }}</td>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { server } from '@/api/server';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Vehicles',
  data: () => ({
    headers: [
      { text: 'Name', value: 'name', align: 'start' },
      { text: 'Make', value: 'make' },
      { text: 'Model', value: 'model' },
      { text: 'Year', value: 'year' },
      { text: 'Power', value: 'power' },
    ],
    vehicles: [{ name: 'Unknown', make: 'Unknown', model: 'Unknown', year: 2020 }],
  }),
  mounted() {
    this.getVehicles();
  },
  methods: {
    async getVehicles() {
      const response = await fetch(`${server.baseURL}/api/vehicles`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      this.vehicles = data;
    },
  },
});
</script>
