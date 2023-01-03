<template>
  <vehicles />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Vehicles from '@/components/Vehicles.vue';

export default defineComponent({
  name: 'VehiclesView',
  components: {
    Vehicles,
  },
});
</script>
