<script setup>
import { VForm } from "vuetify/components/VForm"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import { useAuthStore } from "@/store/auth/authStore"
import { useI18n } from "vue-i18n"
import Swal from "sweetalert2/dist/sweetalert2"
import "sweetalert2/src/sweetalert2.scss"
import { onMounted } from "vue"

const props = defineProps({
  token: {
    type: String,
  },
})

const emit = defineEmits(['setNewStep'])

const { setErrors } = useGlobalHandleError()
const authStore = useAuthStore()
const { t } = useI18n()

const isOtpCompleted = ref(false)
const otpNumber = ref(null)
const refOTPVForm = ref(null)
const timer = ref(60)
const loading = ref(false)

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1900,
  timerProgressBar: true,
})

const zeroPadded = num => {
  return num < 10 ? `0${num}` : num
}

const updateOtp = data => {
  if (data.length === 6) {
    isOtpCompleted.value = true
    otpNumber.value = data
  }else {
    isOtpCompleted.value = false
  }
}

const secondsTimer = () => {
  const interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      clearInterval(timer.value)
    }
  }, 1000)
}

const confirmOTPData = async () => {
  loading.value = true

  if(timer.value == 0) {
    loading.value = false
    
    return Toast.fire({
      icon: "warning",
      title: t("forgot_password.OTP_expire"),
    })
  }

  try {
    const credentials = {
      code: otpNumber.value,
      token: props.token,
    }

    const response = await authStore.sendOTP(credentials)
    if(response.status) {
      Toast.fire({
        icon: "success",
        title: response.message,
      })
      emit('setNewStep', 'reg_step_three')
      loading.value = false
    }
    else{
      loading.value = false
      Toast.fire({
        icon: "error",
        title: response.message,
      })
    }
  } catch (err) {
    loading.value = false
    Toast.fire({
      icon: "error",
      title: err.response.data.message,
    })
  }
}

const resendOtp = async () => {
  try {
    const credentials = {
      token: props.token,
    }

    const response = await authStore.reSendOTP(credentials)
    if(response.status) {
      Toast.fire({
        icon: "success",
        title: t("forgot_password.resend_code_success"),
      }).then(() => {
        timer.value = 50
      })
    }
    else{
      loading.value = false
      Toast.fire({
        icon: "error",
        title: response.message,
      })
    }
  } catch (err) {
    Toast.fire({
      icon: "error",
      title: err.response.data.message,
    })
  }
}

const handleErrors = err => {
  loading.value = false
  if (err.response) {
    const { status, data } = err.response
    if (status === 422) {
      setErrors(data.errors)
    } else {
      router.push('/admin/403')
    }
  }
}


const onSubmitUpdateOTP = () => {
  refOTPVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) confirmOTPData()
  })
}

onMounted(() => {
  secondsTimer()
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
          <AppOtpInput @update-otp="updateOtp" />
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
          <p> <strong>OTP timeout</strong>  00:{{ zeroPadded(timer) }}</p>  
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
  </div>
</template>
