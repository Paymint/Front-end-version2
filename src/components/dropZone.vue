<script setup>
import {
  useDropZone,
  useFileDialog,
  useObjectUrl,
} from '@vueuse/core'
import { onMounted, ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  logo: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['selectedImg'])

const dropZoneRef = ref()

const fileData = ref([
  {
    url: props.logo,
    file: {
      name: 'logo.png',
    },
  },
])

const { open, onChange } = useFileDialog({ accept: 'image/*' })
function onDrop(DroppedFiles) {
  DroppedFiles?.forEach(file => {
    if (file.type.slice(0, 6) !== 'image/') {
      alert('Only image files are allowed')
      
      return
    }
    fileData.value = [{
      file,
      url: useObjectUrl(file).value ?? '',
    }]
  })
}
onChange(selectedFiles => {
  if (!selectedFiles)
    return
  for (const file of selectedFiles) {
    fileData.value = [{
      file,
      url: useObjectUrl(file).value ?? '',
    }]
  }

  emit('selectedImg', fileData.value)
})
useDropZone(dropZoneRef, onDrop)
</script>

<template>
  <div>
    <VCard class="mb-6">
      <VCardItem>
        <template #title>
          {{ props.title }}
        </template>
      </VCardItem>

      <VCardText>
        <div class="flex">
          <div class="w-full h-auto relative">
            <div
              ref="dropZoneRef"
              class="cursor-pointer"
              @click="() => open()"
            >
              <div
                v-if="fileData.length === 0"
                class="d-flex flex-column justify-center align-center gap-y-3 px-6 py-10 border-dashed drop-zone"
              >
                <IconBtn
                  variant="tonal"
                  class="rounded-sm"
                >
                  <VIcon icon="tabler-upload" />
                </IconBtn>
                <div class="text-base text-high-emphasis font-weight-medium">
                  Drag and Drop Your Image Here.
                </div>
                <span class="text-disabled">or</span>

                <VBtn variant="tonal">
                  Browse Images
                </VBtn>
              </div>

              <div
                v-else
                class="d-flex justify-center align-center gap-3 pa-8 border-dashed drop-zone flex-wrap"
              >
                <VRow class="match-height w-100">
                  <template
                    v-for="(item, index) in fileData"
                    :key="index"
                  >
                    <VCol
                      cols="12"
                      sm="4"
                    >
                      <VCard
                        :ripple="false"
                        border
                      >
                        <VCardText
                          class="d-flex flex-column"
                          @click.stop
                        >
                          <VImg
                            :src="item.url"
                            width="200px"
                            height="150px"
                            class="w-100 mx-auto"
                          />
                          <div class="mt-2">
                            <span class="clamp-text text-wrap">
                              {{ item.file.name }}
                            </span>
                          </div>
                        </VCardText>
                        <VSpacer />
                        <VCardActions>
                          <VBtn
                            variant="outlined"
                            block
                            @click.stop="fileData.splice(index, 1)"
                          >
                            Remove File
                          </VBtn>
                        </VCardActions>
                      </VCard>
                    </VCol>
                  </template>
                </VRow>
              </div>
            </div>
          </div>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
  .drop-zone {
    border: 2px dashed rgba(var(--v-theme-on-surface), 0.12);
    border-radius: 6px;
  }
</style>
