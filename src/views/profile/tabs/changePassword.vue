<script setup>
import {
  confirmedValidator,
  passwordValidator,
  requiredValidator,
} from "@validators"
import { ref } from "vue"
import { useAuthStore } from "@/store/auth/authStore"
import { useI18n } from "vue-i18n"
import Swal from "sweetalert2/dist/sweetalert2"
import "sweetalert2/src/sweetalert2.scss"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import { useToast } from '@/composable/useToast'
import { useAppAbility } from '@/plugins/casl/useAppAbility'
import PinCode from "@/components/Pin.vue"
import axios from "@axios"


const { t } = useI18n()
const authStore = useAuthStore()
const { setErrors } = useGlobalHandleError()
const { showToast } = useToast()
const ability = useAppAbility()


const oldPassword = ref("")
const password = ref("")
const repeatPassword = ref("")
const isOldPasswordVisible = ref(false)
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const refForm = ref()
const isOtpShow = ref(false)
const forgetPasswordToken = ref(null)
const loading = ref(false)
const ChangePinloading = ref(false)
const isPinDialogVisible = ref(false)

const baseUrl = process.env.VUE_APP_BASE_URL 

const changePassword = async () => {
  const res = await refForm.value?.validate()

  if(res.valid){
    loading.value = true

    try {
      const credentials = {
        current_password: oldPassword.value,
        password: password.value,
        password_confirmation: repeatPassword.value,
      }
  
      const response = await authStore.changePasswordProfile(credentials)
      if (response.status) {
        loading.value = false
        showToast(t("general.password_changed_successfully"), { icon: 'success' } )
        setTimeout(() => {
          localStorage.removeItem('userData')
          localStorage.removeItem('accessToken')
          localStorage.removeItem('userAbilities')
          ability.update(initialAbility)
          localStorage.clear()
          window.location.href = '/login'
        }, 5000)
      }
    } catch (err) {
      handleErrors(err)
    }
  }

}

const changePin = () => {
  ChangePinloading.value = true

  Swal.fire({
    title: t('pin.reset_pin_alert_title'),
    text: t('pin.reset_pin_alert_content'),
    icon: "warning",
    confirmButtonColor: "#34c38f",
    cancelButtonColor: "#f46a6a",
    confirmButtonText: t('pin.reset_pin_alert_ok_btn_title'),
    cancelButtonText: t('pin.reset_pin_alert_cancel_btn_title'),
    showCancelButton: true,
  }).then(result => {
    if (result.value) {
      resetPin()
    } else {
      ChangePinloading.value = false
    }
  })
}

const resetPin = () => {
  axios.post(baseUrl + 'reset-pin').then(response => {
    if (response.status) {
      ChangePinloading.value = false
      showToast( t('pin.pin_otp_send_successfully'), { icon: 'success' })
      isOtpShow.value = true
    }
  }).catch(e => {
    ChangePinloading.value = false
    handleErrors(e)
  })
}

const updateDataConfirmed = () => {
  isPinDialogVisible.value = true
}

const verifyData = () => {  
  setTimeout(() => {
    window.location.reload()
  }, 2500)
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
</script>

<template>
  <VCard title="Change Password">
    <VForm 
      ref="refForm" 
      @submit.prevent="changePassword"
    >
      <VCardItem>
        <VRow class="px-2 py-1">
          <VCol 
            cols="12" 
            md="6"
          >
            <AppTextField
              v-model="oldPassword"
              persistent-placeholder
              placeholder="old password"
              :type="isOldPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="
                isOldPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
              "
              :rules="[requiredValidator, passwordValidator]"
              class="input-field"
              autocomplete="on"
              @click:append-inner="isOldPasswordVisible = !isOldPasswordVisible"
            />
          </VCol>
        </VRow>
        <VRow class="px-2 py-1">    
          <VCol 
            cols="12" 
            md="6"
          >
            <AppTextField
              v-model="password"
              persistent-placeholder
              placeholder="new password"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="
                isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
              "
              class="input-field"
              :rules="[requiredValidator, passwordValidator]"
              autocomplete="on"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />
          </VCol>  
          <VCol
            md="6" 
            cols="12"
          >
            <AppTextField
              v-model="repeatPassword"
              persistent-placeholder
              placeholder="confirm new password"
              :type="isConfirmPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="
                isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
              "
              class="input-field"
              :rules="[
                requiredValidator,
                confirmedValidator(repeatPassword, password),
              ]"
              autocomplete="on"
              @click:append-inner="
                isConfirmPasswordVisible = !isConfirmPasswordVisible
              "
            />
          </VCol>

          <VCol cols="12">
            <VBtn 
              type="submit"
              size="small"
              :loading="loading"
            >
              {{ t("ch_password.confirm_new_password") }}
              <template #loader>
                <span class="custom-loader">
                  <VIcon icon="tabler-refresh" />
                </span>
              </template>  
            </VBtn>
          </VCol>
        </VRow>
      </VCardItem>
    </VForm>
  </VCard>
  <VCard 
    title="Change Pin" 
    class="mt-5"
  >
    <VCardItem>
      <VBtn 
        v-if="!isOtpShow"
        :loading="ChangePinloading"
        color="primary"
        size="small"
        @click="changePin"
      >
        {{ $t('pin.change_my_pin') }}
        <template #loader>
          <span class="custom-loader">
            <VIcon icon="tabler-refresh" />
          </span>
        </template>
      </VBtn>    
    </VCardItem>

    <VCardItem
      v-if="isOtpShow"
      class="w-50 mx-auto otp-component" 
    >
      <AppOTPComponent 
        :forget-password-token="forgetPasswordToken"
        otp-type="changePassword"
        @set-confirm-password="updateDataConfirmed"
      />
    </VCardItem>
  </VCard>
  <PinCode 
    v-model:isDialogVisible="isPinDialogVisible" 
    pin-type="set"
    @is-verified="verifyData"
  />
</template>

<style>
.otp-component{
  @media (max-width: 768px) {
    width: 100% !important;
  }
}
</style>
