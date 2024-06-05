<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getMusicData } from '@/services/firestoreService'
import type MusicData from '@/model/MusicData'
import type Header from '@/model/Header'
import { authGoogle } from '@/services/googleAuthService'

const musicList = ref<MusicData[]>([])
const loading = ref<boolean>(false)

onMounted(async () => {
  // if (await authGoogle()) {
  // }
  try {
    loading.value = true
    musicList.value = await getMusicData()
  } finally {
    loading.value = false
  }
})

const header = ref<Header[]>([
  { title: 'Título', value: 'name', sortable: true },
  { title: 'Letra', value: 'description', sortable: true },
  { title: 'Tom', value: 'tom', sortable: true },
  { title: 'Cifra', value: 'webViewLink', sortable: true }
])

const search = ref<string>()
</script>

<template>
  <v-card flat>
    <v-card-title class="d-flex justify-center">Músicas</v-card-title>

    <v-card-text>
      <v-text-field
        v-model="search"
        label="Pesquisar música"
        prepend-inner-icon="mdi-magnify"
        hide-details
        single-line
        density="compact"
      ></v-text-field>
    </v-card-text>

    <v-data-table-virtual
      :items="musicList"
      :headers="header"
      :search="search"
      height="400"
      density="compact"
      show-select
      no-data-text="Nenhuma música encontrada"
      class="px-1 py-2"
      :loading="loading"
      loading-text="Carregando músicas"
    >
      <template #[`item.description`]="{ item }">
        <span class="overflow-hidden">{{ item.description }}</span>
      </template>
      <template #[`item.webViewLink`]="{ item }">
        <a :href="item.webViewLink" target="_blank" rel="noopener">Drive</a>
      </template>
    </v-data-table-virtual>
  </v-card>
</template>

