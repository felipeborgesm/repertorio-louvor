<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type LoadParams from '@/model/LoadParamsForInfiteScrollComponent'
import { getMusicData } from '@/services/firestoreService'
import type MusicData from '@/model/MusicData'
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

const search = ref<string>('')

const filteredMusicList = computed(() => {
  if (!search.value) {
    return musicList.value
  }
  return musicList.value.filter(
    (music) =>
      music.name.toLowerCase().includes(search.value.toLowerCase()) ||
      music.description.toLowerCase().includes(search.value.toLowerCase())
  )
})

const showSelect = ref<boolean>()

const selectedMusics = ref<MusicData[]>([])
const isMusicTableSelectable = ref<boolean>(true)

function handleButtonClick() {
  showSelect.value = !showSelect.value
  selectedMusics.value = []
}

function musicSelected(music: MusicData) {
  const index = selectedMusics.value.findIndex((selectedMusic) => selectedMusic.id === music.id)
  if (index === -1) {
    if (selectedMusics.value.length < 6) {
      selectedMusics.value.push(music)
    }
  } else {
    selectedMusics.value.splice(index, 1)
  }
}

watch(
  selectedMusics,
  (newValue) => {
    if (newValue.length > 5) {
      isMusicTableSelectable.value = false
    } else {
      isMusicTableSelectable.value = true
    }
  },
  { deep: true, immediate: true }
)

function isSelected(music: MusicData) {
  return selectedMusics.value.some((selectedMusic) => selectedMusic.id === music.id)
}
function isDisabled(music: MusicData) {
  return !isSelected(music) && selectedMusics.value.length >= 6
}

function load({ done }: LoadParams) {
  setTimeout(() => {
    done('empty')
  }, 1000)
}
function load2({ done }: LoadParams) {
  setTimeout(() => {
    done('empty')
  }, 1000)
}
</script>

<template>
  <v-card flat>
    <v-card-title class="d-flex justify-center">Músicas</v-card-title>

    <v-card-text class="d-flex justify-center">
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

    <v-row class="px-3 mb-2">
      <v-col cols="12" :md="!$vuetify.display.mobile && showSelect ? 6 : 12">
        <v-list class="border-rounded" lines="two">
          <v-list-subheader class="text-subtitle-1 font-weight-bold d-flex justify-center">
            Repertório completo
          </v-list-subheader>

          <v-infinite-scroll :height="400" :items="filteredMusicList" @load="load">
            <template v-for="(item, index) in filteredMusicList" :key="index">
              <v-list-item
                class="d-flex align-center"
                :class="{ 'selected-row': isSelected(item) }"
              >
                <template v-if="showSelect" v-slot:prepend>
                  <div>
                    <v-checkbox
                      :input-value="isSelected(item)"
                      :disabled="isDisabled(item)"
                      @click.stop="musicSelected(item)"
                    />
                  </div>
                </template>
                <template v-slot:title>
                  <p class="font-weight-bold">{{ item.name }}</p>
                  <span class="flex-grow-1 overflow-hidden">{{ item.description }}</span>
                </template>
                <template v-slot:subtitle>
                  <p>Tom: {{ item.tom }}</p>
                </template>
              </v-list-item>
            </template>

            <template v-slot:empty>
              <span></span>
            </template>
          </v-infinite-scroll>
        </v-list>
      </v-col>

      <v-col cols="12" :md="!$vuetify.display.mobile && showSelect ? 6 : 12">
        <v-list v-if="showSelect" class="border-rounded" lines="two">
          <v-list-subheader class="text-subtitle-1 font-weight-bold d-flex justify-center">
            Músicas escolhidas
          </v-list-subheader>

          <v-infinite-scroll :height="400" :items="selectedMusics" @load="load2">
            <template v-for="(music, index) in selectedMusics" :key="music.id">
              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar>
                    <span>{{ index + 1 }}</span>
                  </v-avatar>
                </template>
                <template v-slot:title>
                  <span>{{ music.name }}</span>
                  <span> - Tom: {{ music.tom }}</span>
                </template>
                <template v-slot:subtitle>
                  <div class="d-flex flex-column">
                    <span>
                      <a :href="music.webViewLink" target="_blank" rel="noopener">Drive</a>
                    </span>
                    <span>
                      <a :href="music.youtube_link" target="_blank" rel="noopener">Youtube</a>
                    </span>
                  </div>
                </template>
              </v-list-item>
            </template>

            <template v-slot:empty>
              <span></span>
            </template>
          </v-infinite-scroll>
        </v-list>
      </v-col>
    </v-row>
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
  max-width: 10px;
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
  border-radius: 10px;
}
</style>
