<script setup>
import { ref, onMounted } from "vue"
import { VForm } from "vuetify/components/VForm"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import { useAuthStore } from "@/store/auth/authStore"
import { useToast } from '@/composable/useToast'
import { useI18n } from "vue-i18n"
import otpSrc from "@images/otp.png"

const props = defineProps({
  token: {
    type: String,
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  mobileNumber: {
    type: String,
  },
})

const emit = defineEmits(['update:isDialogVisible', 'setNewStep'])

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}

const { setErrors } = useGlobalHandleError()
const authStore = useAuthStore()
const { showToast } = useToast()
const { t } = useI18n()

const isOtpCompleted = ref(false)
const otpNumber = ref(null)
const refOTPVForm = ref(null)
const loading = ref(false)
const timercounter = ref(600)
const minutes = ref(Math.floor(timercounter.value / 60))
const seconds = ref(timercounter.value % 60)

/* data reactive */

const updateOtp = data => {
  if (data.length === 6) {
    isOtpCompleted.value = true
    otpNumber.value = data
  }else {
    isOtpCompleted.value = false
  }
}

const confirmOTPData = async () => {
  loading.value = true

  if(timer.value == 0) {
    loading.value = false
    
    return  showToast(t("forgot_password.OTP_expire"), { icon: 'warning' })

  }

  try {
    const credentials = {
      code: otpNumber.value,
      token: props.token,
    }

    const response = await authStore.sendOTP(credentials)
    if(response.status) {
      showToast(response.message, { icon: 'success' })
      emit('setNewStep', 'reg_step_three')
      loading.value = false
    }
    else{
      loading.value = false
      showToast(response.message, { icon: 'error' })
    }
  } catch (err) {
    loading.value = false
    handleErrors(err)
  }
}

const resendOtp = async () => {
  const credentials = {
    token: props.token,
  }

  axios.post(baseUrl + 'resend-otp', credentials).then(response => {
    if(response.status) {
      showToast(t("forgot_password.resend_code_success"), { icon: 'success' })
      minutes.value = 9
      seconds.value = 59
    }
    else{
      showToast(response.message, { icon: 'error' })
    }
  }).catch(e => {
    handleErrors(e)
  })
}

const handleErrors = err => {
  loading.value = false
  if(err.response) {
    const { status, data } = err.response

    if (status === 422) {
      setErrors(data.errors)
    } else {
      showToast(data.message, { icon: 'error' })
    }
  }
}


const decreaseTime = () => {
  if (minutes.value === 0 && seconds.value === 0) {
    return
  }

  if (seconds.value === 0) {
    minutes.value--
    seconds.value = 59
  } else {
    seconds.value--
  } 
}

const onSubmitUpdateOTP = () => {
  refOTPVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) confirmOTPData()
  })
}


const minutesDisplay = computed(() => String(minutes.value).padStart(2, '0'))
const secondsDisplay = computed(() => String(seconds.value).padStart(2, '0'))

onMounted(() => {
  const timer = setInterval(decreaseTime, 1000)

  return () => clearInterval(timer)
})
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
          @submit.prevent="onSubmitUpdateOTP"
        >
          <VRow>
            <!-- otp -->
            <VCol cols="12">
              <AppOtpInput @update-otp="updateOtp">
                <template #header>
                  <div class="d-flex justify-center flex-column align-center">
                    <h3>Verify your Phone</h3>
                    <p>Please enter the 6 digit code sent to ********{{ props.mobileNumber.slice(-2) }}</p>  
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
                Verify OTP
                <template #loader>
                  <span class="custom-loader">
                    <VIcon icon="tabler-refresh" />
                  </span>
                </template>
              </VBtn>
            </VCol>
    
            <VCol cols="12 text-center">
              <p> <strong>OTP timeout</strong> {{ minutesDisplay }}:{{ secondsDisplay }}</p>  
            </VCol>
    
            <!-- resend otp -->
            <VCol cols="12">
              <div class="d-flex justify-center align-center flex-wrap">
                <span class="me-0">Didn't get the code?</span>
                <VBtn 
                  class="px-2" 
                  variant="plain"
                  @click="resendOtp"
                >
                  Resend
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>  
    </VCard>
  </VDialog>
</template>
