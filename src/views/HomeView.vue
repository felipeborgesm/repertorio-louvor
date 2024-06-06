<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getMusicData } from '@/services/firestoreService'
import type MusicData from '@/model/MusicData'
import type Header from '@/model/Header'
import { authGoogle } from '@/services/googleAuthService'

const musicList = ref<MusicData[]>([])
const loading = ref<boolean>(false)

onMounted(async () => {
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
const showSelect = ref<boolean>()

function handleButtonClick() {
  loading.value = true
  showSelect.value = !showSelect.value
  selectedMusics.value = []
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

const selectedMusics = ref<MusicData[]>([])
</script>

<template>
  <v-card flat>
    <v-card-title class="d-flex justify-center">Músicas</v-card-title>

    <v-card-text>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          label="Pesquisar música"
          prepend-inner-icon="mdi-magnify"
          hide-details
          single-line
          density="compact"
          variant="solo"
          rounded
        ></v-text-field>
      </v-col>
    </v-card-text>

    <v-col cols="12">
      <v-data-table-virtual
        v-model="selectedMusics"
        return-object
        :items="musicList"
        :headers="header"
        :search="search"
        height="400"
        density="compact"
        :show-select="showSelect"
        no-data-text="Nenhuma música encontrada"
        class="border-rounded py-2"
        :loading="loading"
        loading-text="Carregando músicas"
      >
        <template #[`item.name`]="{ item }">
          <span class="font-weight-bold">{{ item.name }}</span>
        </template>
        <template #[`item.description`]="{ item }">
          <td class="text-overflow">{{ item.description }}</td>
        </template>
        <template #[`item.tom`]="{ item }">
          <span class="font-weight-bold">{{ item.tom }}</span>
        </template>
        <template #[`item.webViewLink`]="{ item }">
          <a :href="item.webViewLink" target="_blank" rel="noopener">Drive</a>
        </template>
      </v-data-table-virtual>
    </v-col>

    <v-col v-if="showSelect && selectedMusics.length > 0">
      <v-list class="border-rounded" lines="two">
        <v-list-subheader class="text-subtitle-1 font-weight-bold" inset>Músicas escolhidas</v-list-subheader>

        <v-list-item v-for="(music, index) in selectedMusics" :key="music.id">
          <template v-slot:prepend>
            <v-avatar>
              <span>{{ index + 1 }}</span>
            </v-avatar>
          </template>
          <template v-slot:title>
            <span>{{ music.name }}</span>
          </template>
          <template v-slot:subtitle>
            <span>Tom: {{ music.tom }}</span>
          </template>
        </v-list-item>
      </v-list>
    </v-col>
  </v-card>

  <v-btn icon class="floating-button" elevation="6" @click="handleButtonClick">
    <v-icon size="20">mdi-file</v-icon>
  </v-btn>
</template>

<style scoped>
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 180px;
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.border-rounded {
  border-radius: 10px;
}

.selected-row {
  background-color: #d3d3d3; /* Altere a cor conforme necessário */
}
</style>
