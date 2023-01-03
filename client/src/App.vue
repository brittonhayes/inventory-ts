<template>
  <v-app>
    <v-app-bar title="Inventory"></v-app-bar>
    <v-navigation-drawer permanent expand-on-hover>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link class="flex">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      items: [
        { title: 'Home', link: '/', icon: 'mdi-home' },
        { title: 'Vehicles', link: '/vehicles', icon: 'mdi-car' },
      ],
    };
  },
});
</script>
