<script setup>
import { ref } from "vue"
import { VForm } from "vuetify/components/VForm"
import {
  requiredValidator,
} from "@validators"
import { useI18n } from "vue-i18n"
import { useUserStore } from "@/store/agent/useUserStore"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import UserDataDialog from "@/views/agent/users/VerifyUser.vue"


const { t } = useI18n()
const UserStore = useUserStore()
const { setErrors } = useGlobalHandleError()

const title = ref(`${t("change_branch")}`)

const nationalId = ref(null)
const refDataVForm = ref(null)
const loading = ref(false)
const isDialogVisible = ref(false)
const userData = ref([])
const cardData = ref([])
const branchData = ref([])


const formErrors = ref({
  nationalId: undefined,
})


const items = [
  {
    title: 'Dashboard',
    disabled: false,
    href: 'dashboard',
  },
  {
    title: t('general.cards'),
    disabled: true,
  },
  {
    title: t('change_branch'),
    disabled: true,
  },
]


/* otp */
const checkUserFound = async () => {
  loading.value = true

  let data = {
    national_id: nationalId.value,
  }

  try {

    const response = await UserStore.getUserByNationalID(data)

    if(response.status){
      loading.value = false
      isDialogVisible.value = true
      userData.value = response.data.user
      cardData.value = response.data.card
      branchData.value = response.data.branch
    }
  } catch (e) { 
    loading.value = false
    setErrors(e.response.data.errors)
  }
 
}

const checkUser = () => {
  refDataVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) checkUserFound()
  })
}
</script>

<template>
  <div class="add-user">
    <VRow class="mb-5">
      <VCol cols="12 d-flex justify-space-between">
        <PageHeader 
          :items="items" 
          :title="title"
        />
      </VCol>
    </VRow>

    <VCard>
      <VCardText>
        <VForm
          ref="refDataVForm"
          class="form-horizontal"
          @submit.prevent="checkUser"
        >
          <VRow>
            <VCol 
              cols="6"
              sm="6"  
            >
              <VTextField
                v-model="nationalId"
                prepend-inner-icon="tabler-id-badge"
                class="input-field"
                variant="outlined"
                :error-messages="formErrors.nationalId"
                :rules="[requiredValidator]"
                label="National"
                type="text"
              />
            </VCol>

            <VCol 
              class="d-flex flex-end"
              sm="6"
              cols="12"
            >
              <VBtn
                :loading="loading"
                type="submit"
              >
                {{ $t("general.search") }}
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

    <UserDataDialog 
      v-model:isDialogVisible="isDialogVisible"
      :user-data="userData"
      :card-data="cardData"
      :branch="branchData"
      type="change-branch"
    />
  </div>
</template>
