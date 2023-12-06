<script setup>
import { ref } from "vue"
import EgyptIcon from "@images/egypt.png"
import { VForm } from "vuetify/components/VForm"
import { useI18n } from "vue-i18n"
import { useUserStore } from "@/store/agent/useUserStore"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import GeneralOTP from "@/components/OTPDialog.vue"
import UploadID from "./UploadID.vue"

const { t } = useI18n()
const UserStore = useUserStore()
const { errors, setErrors } = useGlobalHandleError()

const title = ref(`${t("general.add")}`)

const registerUserStep = ref('reg_step_two')
const nationalId = ref(null)
const mobile = ref(null)
const refDataVForm = ref(null)
const loading = ref(false)
const isOtpDialogVisible = ref(false)
const frontId = ref([])


const formErrors = ref({
  mobile: undefined,
  nationalId: undefined,
})


const items = [
  {
    title: 'Dashboard',
    disabled: false,
    href: 'dashboard',
  },
  {
    title: t('general.users'),
    disabled: false,
  },
  {
    title: t('general.add'),
    disabled: true,
  },
]


const checkUserFound = async () => {
  loading.value = true

  try {

    let payload = {
      national_id: nationalId.value,
      mobile_number: mobile.value,
      source: 'agent',
    }

    const response = await UserStore.registerUser(payload)

    if (response.status) { 
      loading.value = false
      registerUserStep.value = 'reg_step_two'
      isOtpDialogVisible.value = true
    }

  } catch (err) { 
    if(err.response.status == 422){
      loading.value = false
      setErrors(err.response.data.errors)
    }
  }
}

/* otp */
const updateStep = data => {
  registerUserStep.value = data
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
      <VCol cols="12 d-flex justify-space-between ">
        <PageHeader 
          :items="items" 
          :title="title" 
        />
      </VCol>
    </VRow>

    <VCard v-if="registerUserStep === 'reg_step_one'">
      <VCardText>
        <VForm
          class="form-horizontal"
          @submit.prevent="checkUser"
        >
          <VRow>
            <VCol cols="6">
              <VTextField
                v-model="nationalId"
                prepend-inner-icon="tabler-id-badge"
                class="input-field"
                variant="outlined"
                :error-messages="formErrors.nationalId"
                label="National"
                type="text"
              />
            </VCol>
            
            <VCol cols="6">
              <VTextField
                v-model="mobile"
                class="input-field mobile-field"
                :error-messages="formErrors.mobile"
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

            <VCol 
              class="d-flex flex-end"
              cols="12"
            >
              <VBtn
                :loading="loading"
                type="submit"
              >
                {{ $t("pin.check") }}
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
      <GeneralOTP 
        v-model:isDialogVisible="isOtpDialogVisible"
        :token="forgetPasswordToken"
        :mobile-number="mobile"
        @set-new-step="updateStep" 
      />
    </VCard>

    <VCard v-if="registerUserStep === 'reg_step_two'">
      <VCardText>
        <UploadID />
      </VCardText>  
    </VCard>
  </div>
</template>
