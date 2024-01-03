<script setup>
import { VForm } from "vuetify/components/VForm"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import { useAuthStore } from "@/store/auth/authStore"
import { useI18n } from "vue-i18n"
import { useToast } from '@/composable/useToast'
import { onMounted, computed } from "vue"
import axios from "@axios"

const props = defineProps({
  forgetPasswordToken: {
    type: String,
  },
  otpType: {
    type: String,
  },
})

const emit = defineEmits(['setConfirmPassword'])

const { setErrors } = useGlobalHandleError()
const { t } = useI18n()
const { showToast } = useToast()
const authStore = useAuthStore()


const isOtpCompleted = ref(false)
const otpNumber = ref(null)
const refOTPVForm = ref(null)
const loading = ref(false)
const timercounter = ref(600)
const minutes = ref(Math.floor(timercounter.value / 60))
const seconds = ref(timercounter.value % 60)
const baseUrl = process.env.VUE_APP_BASE_URL 


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

  if(minutes.value === 0 && seconds.value === 0) {
    loading.value = false

    return showToast(t("forgot_password.OTP_expire"), { icon: 'warning' })
  }

  let credentials

  if (props.otpType == 'forgetPassword'){
    credentials = {
      code: otpNumber.value,
      forget_password_token: props.forgetPasswordToken,
    }

    axios.post(baseUrl + 'verify-otp-for-password', credentials).then(response => {
      if(response.status) {
        showToast(response.data.message, { icon: 'success' })
        emit('setConfirmPassword', 'confirm-new-password')
        loading.value = false
      }
      else{
        loading.value = false
        showToast(response.data.message, { icon: 'error' })
      }
    }).catch(e => {
      handleErrors(e)
    })
  }

  if (props.otpType == 'changePassword'){

    credentials = {
      code: otpNumber.value,
    }

    axios.post(baseUrl + 'verify-pin-otp', credentials).then(response => {
      if(response.status) {
        showToast(response.data.message, { icon: 'success' })
        emit('setConfirmPassword', 'confirm-new-password')
        loading.value = false
      }
      else{
        loading.value = false
        showToast(response.data.message, { icon: 'error' })
      }
    }).catch(e => {
      handleErrors(e)
    })
  }

}

const resendOtp = () => {
  
  if (props.otpType === 'forgetPassword') {
    resendOtpForForgetPassword()
  }

  if (props.otpType === 'changePassword') {
    resendOtpForChangePassword()
  }
}

const resendOtpForForgetPassword = async () => {

  const credentials = {
    forget_password_token: props.forgetPasswordToken,
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

const resendOtpForChangePassword = () => {

  axios.post(baseUrl + 'reset-pin').then(response => {
    if (response.status) {
      showToast( t('pin.pin_otp_send_successfully'), { icon: 'success' })
      minutes.value = 9
      seconds.value = 59
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
  <div class="otp-component">
    <VForm 
      ref="refOTPVForm"
      @submit.prevent="onSubmitUpdateOTP"
    >
      <VRow>
        <!-- otp -->
        <VCol cols="12">
          <AppOtpInput @update-otp="updateOtp">
            <template #header>
              <h6 class="text-h6 mb-5 text-center">
                Verify OTP Number
              </h6>
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
          <p> <strong>OTP timeout</strong>  {{ minutesDisplay }}:{{ secondsDisplay }}</p>  
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

        <slot name="back" />
      </VRow>
    </VForm>
  </div>
</template>
