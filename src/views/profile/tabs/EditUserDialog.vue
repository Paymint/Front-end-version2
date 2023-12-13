<script setup>
import { useI18n } from "vue-i18n"
import EgyptIcon from "@images/egypt.png"
import { useEgyptPhoneNumber } from "@/composable/useEgyptPhoneNumber"
import { VForm } from 'vuetify/components/VForm'
import { onMounted } from "vue"



const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible', 'setNewStep'])

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}

const { checkIfEgyptPhoneNumber } = useEgyptPhoneNumber()
const { t } = useI18n()

const refVForm = ref()
const userData = ref(structuredClone(toRaw(props.userData)))
const loading = ref(false)


const editUserData = () => {
  console.log("Edit user data")
}

/* submit data */
const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      editUserData()
  })
}
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    persistent
    scroll-strategy="none"
    max-width="600"
    @update:model-value="dialogVisibleUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />

    <!-- Dialog Content -->
    <VCard class="pt-5 user-data">
      <VCardTitle>
        <h3 class="card-data-header">Edit User Information</h3>
      </VCardTitle>
      <VCardText>
        <VForm
          ref="refVForm"
          @submit.prevent="onSubmit"
        >
          <VRow>
            <!-- mobile -->
            <VCol cols="12">
              <VTextField
                v-model="userData.phone_number"
                class="input-field mobile-field"
                autofocus
                type="text"
                label="Mobile"
                variant="outlined"
              >
                <template #prepend-inner>
                  <img 
                    :src="EgyptIcon" 
                    alt="Custom Icon" 
                    style="width: 20px; height: 20px; " 
                  >
                </template>
              </VTextField>
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="userData.role.name"
                prepend-inner-icon="tabler-id-badge"
                class="input-field"
                variant="outlined"
                label="Name"
                type="text"
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="userData.email"
                prepend-inner-icon="tabler-mail"
                class="input-field"
                variant="outlined"
                label="Email"
                type="text"
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="userData.user_name"
                prepend-inner-icon="tabler-id-badge"
                class="input-field"
                variant="outlined"
                label="User Name"
                type="text"
              />
            </VCol>

            <VCol cols="12">
              <VBtn
                block
                type="submit"
                :loading="loading"
              >
                Edit Data
                <template #loader>
                  <span class="custom-loader">
                    <VIcon icon="tabler-refresh" />
                  </span>
                </template>
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
