<script setup>
import { ref, onMounted } from "vue"
import { VForm } from "vuetify/components/VForm"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import { useUserStore } from "@/store/agent/useUserStore"
import { useI18n } from "vue-i18n"
import otpSrc from "@images/otp.png"


const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible', 'isVerified'])

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}

const { setErrors } = useGlobalHandleError()
const authStore = useUserStore()
const { t } = useI18n()

const isOtpCompleted = ref(false)
const otpNumber = ref(null)
const refOTPVForm = ref(null)
const loading = ref(false)
const isError = ref(false)
const isSuccess = ref(false)
const errMsg = ref(null)
const successMsg = ref(null)

/* data reactive */

const updatePin = data => {
  if (data.length === 6) {
    isOtpCompleted.value = true
    otpNumber.value = data
  }else {
    isOtpCompleted.value = false
  }
}

const confirmPinData = async () => {
  loading.value = true

  try {
    const credentials = {
      personal_pin: otpNumber.value,
    }

    const response = await authStore.checkPin(credentials)
    if(response.status) {
      isSuccess.value = true
      successMsg.value = response.message
      emit('isVerified', otpNumber.value)
      loading.value = false
    } else{
      loading.value = false
      isError.value = true
      errMsg.value = response.message
    }
  } catch (err) {
    loading.value = false
    isError.value = true
    errMsg.value = err.response.data.message
  }
}

const onSubmitUpdatePin = () => {
  refOTPVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) confirmPinData()
  })
}
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    persistent
    scroll-strategy="none"
    max-width="500"
    @update:model-value="dialogVisibleUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />

    <!-- Dialog Content -->
    <VCard class="pt-5">
      <VCardText>
        <VRow>
          <VCol 
            class="d-flex justify-center"
            cols="12" 
          >
            <img :src="otpSrc">  
          </VCol>  
        </VRow>
        <VForm 
          ref="refOTPVForm"
          @submit.prevent="onSubmitUpdatePin"
        >
          <VRow>
            <!-- otp -->
            <VCol cols="12">
              <AppOtpInput @update-otp="updatePin">
                <template #header>
                  <div class="d-flex justify-center flex-column align-center mb-5">
                    <h2>Enter Your PIN</h2>
                  </div>  
                </template>
              </AppOtpInput>  
            </VCol>
    
            <!-- verify otp -->
            <VCol cols="12">
              <VBtn
                :disabled="!isOtpCompleted"
                block
                type="submit"
                :loading="loading"
              >
                Verify
                <template #loader>
                  <span class="custom-loader">
                    <VIcon icon="tabler-refresh" />
                  </span>
                </template>
              </VBtn>
            </VCol>
            <VCol
              v-if="isError" 
              cols="12"
            >
              <VAlert type="error">
                {{ errMsg }}
              </VAlert>  
            </VCol>
          </VRow>
        </VForm>
      </VCardText>  
    </VCard>
  </VDialog>
</template>
