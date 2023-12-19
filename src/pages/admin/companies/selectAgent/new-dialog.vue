<script setup>
import { onMounted, ref } from "vue"
import { useCompanyService } from "@/store/companies/useCompanyService"


/* props */
const prop = defineProps({
  rowId: {
    type: Number,
    required: true,
  },
})

/* Emits */
const emit = defineEmits([
  'emitAgents',
  'increaseCounter',
])


/* composables */
const companyStore = useCompanyService()

/* data reactive */
const isDialogVisible = ref(false)
const selectedAgents = ref([])
const agents = ref([])


/* const data */

let agentsData


/* methods */
const assignAgents = () => {
  let agents = selectedAgents.value
  emit('emitAgents', agents, prop.rowId)
  agentsData = agents
  isDialogVisible.value = false
}

const closeDialog = ()  => {
  isDialogVisible.value = false
  agentsData.filter(el => {
    if(!selectedAgents.value.includes(el)){
      selectedAgents.value = agentsData
    }
  })
}

const getSales = async () => {
  /******* st get data ******/
  try {
    const response = await companyStore.getAllAgents()
    
    agents.value = response.data
    Object.keys(response.data).map(k => ({
      id: response.data[k].id,
      name: response.data[k].name,
    }))
  } catch (err) {
    console.error(err)
  }

  /******* nd get data ******/
}

onMounted(() => {
  getSales()
})
</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    persistent
    scroll-strategy="none"
    max-width="600"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <IconBtn v-bind="props">
        <VIcon
          icon="tabler-plus"
          color="info"
        />
      </IconBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="closeDialog" />

    <!-- Dialog Content -->
    <VCard :title="`${$t('general.assign')} ${$t('general.agent')}`">
      <VCardText>
        <VRow>
          <VCol cols="12 my-8">
            <VSelect
              v-model="selectedAgents"
              :items="agents"
              item-title="name"
              chips
              :label="`${$t('general.choose_agent')}`"
              multiple
            />
          </VCol>
        </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          variant="tonal"
          color="secondary"
          @click="closeDialog"
        >
          {{ $t("general.close") }}
        </VBtn>
        <VBtn @click.prevent="assignAgents">
          {{ $t("general.assign") }}
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
