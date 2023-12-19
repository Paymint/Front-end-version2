<script setup>
import { ref, onMounted } from "vue"
import { VForm } from "vuetify/components/VForm"
import { useAuthStore } from "@/store/auth/authStore"
import { useI18n } from "vue-i18n"
import otpSrc from "@images/otp.png"


const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  pinType: {
    type: String,
  },
})

const emit = defineEmits(['update:isDialogVisible', 'isVerified'])

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}

const authStore = useAuthStore()
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
  isSuccess.value = false
  isError.value = false


  try {
    const credentials = {
      personal_pin: otpNumber.value,
    }

    let response

    if (props.pinType === 'check') {
      response = await authStore.checkPin(credentials)
    }
    if (props.pinType === 'set') {
      response = await authStore.setPin(credentials)
    }

    if(response.status) {
      isSuccess.value = true
      successMsg.value = t('pin.pin_set_successfully')
      emit('isVerified', otpNumber.value)
      loading.value = false
    } else {
      isError.value = true
      errMsg.value = response.message
      loading.value = false
    }

    console.log(isError.value)
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
                <span v-if="props.pinType === 'set'">
                  Set PIN
                </span>
                <span v-if="props.pinType === 'check'">
                  Verify PIN
                </span>
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
            <VCol
              v-if="isSuccess" 
              cols="12"
            >
              <VAlert type="success">
                {{ successMsg }}
              </VAlert>  
            </VCol>
          </VRow>
        </VForm>
      </VCardText>  
    </VCard>
  </VDialog>
</template>
