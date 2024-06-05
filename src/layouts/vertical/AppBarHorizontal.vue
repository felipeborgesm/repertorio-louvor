<!-- src/layouts/vertical/MenuVertical.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true)
const items = ref([
  {
    title: 'Músicas',
    icon: 'mdi-music-circle-outline',
    value: 'musics'
  }
])
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar density="compact">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Louvor IBCF</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>

          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'left' : undefined"
        temporary
      >
        <v-list v-for="(item, index) in items" :key="index">
          <v-list-item :to="{ path: item.value }">
            <div class="d-flex align-center me-2">
              <v-icon size="22">{{ item.icon }}</v-icon>

              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </div>
          </v-list-item>

          <v-divider class="my-2" />
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <RouterView class="my-2 mx-2" />
      </v-main>
    </v-layout>
  </v-card>
</template>
