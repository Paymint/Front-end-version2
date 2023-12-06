<script setup>
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { VForm } from "vuetify/components/VForm"
import AppOTPComponent from "@/components/AppOTPComponent.vue"
import authImg from "@images/auth/login.jpg"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import { requiredValidator, emailValidator, passwordValidator, confirmedValidator  } from "@validators"
import { useEgyptPhoneNumber } from "@/composable/useEgyptPhoneNumber"
import Swal from "sweetalert2/dist/sweetalert2"
import "sweetalert2/src/sweetalert2.scss"
import { useAuthStore } from "@/store/auth/authStore"
import { useI18n } from "vue-i18n"
import EgyptIcon from "@images/egypt.png"
import { computed } from 'vue'

const { errors, setErrors } = useGlobalHandleError()
const { checkIfEgyptPhoneNumber } = useEgyptPhoneNumber()
const authStore = useAuthStore()
const { t } = useI18n()
const email = ref('')
const mobile = ref('')
const resetType = ref('mobile')
const isDataConfirmed = ref('send-otp')
const loading = ref(false)
const refDataVForm = ref(null)
const refConfirmVForm = ref(null)
const forgetPasswordToken = ref(null)
const newPassword = ref('')
const confirmPassword = ref('')
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)

const formErrors = ref({
  mobile: undefined,
  email: undefined,
})

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
})


watch(resetType, val => {
  if(val) {
    email.value = null
    mobile.value = null
  }
})

const updateDataConfirmed = data => {
  isDataConfirmed.value = data
}

const confirmData = async () => {
  loading.value = true
  if (resetType.value === 'mobile' && !checkIfEgyptPhoneNumber(mobile.value)) {
    loading.value = false

    return false
  }

  try {

    const credentials = resetType.value === 'mobile'
      ? { mobile_number: mobile.value, reset_channel: resetType.value }
      : { email: email.value, reset_channel: resetType.value }

    const response = await authStore.receiveOTP(credentials)

    if(response.status) {
      Toast.fire({
        icon: "success",
        title: t("pin.pin_otp_send_successfully"),
      }).then(() => {
        forgetPasswordToken.value = response.data.forget_password_token
        loading.value = false
        isDataConfirmed.value = 'confirm-otp'
      })
    }
  } catch (err) {
    handleErrors(err)
  }
}

const confirmPasword = async () => {
  loading.value = true
  try {
    const credentials = {
      forget_password_token: forgetPasswordToken.value,
      password: newPassword.value,
      password_confirmation: confirmPassword.value,
    }

    const response = await authStore.confirmNewResetPassword(credentials)
    if(response.status) {
      Toast.fire({
        icon: "success",
        title: t("forgot_password.pass_changed_success"),
      }).then(() => {
        loading.value = false
        localStorage.clear()
        window.location.href = '/login'
      })
    }
  } catch (err) {
    handleErrors(err)
  }
}

/* data submit */
const onSubmitUserData = () => {
  refDataVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) confirmData()
  })
}

const onSubmitConfirmPassword = () => {
  refConfirmVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) confirmPasword()
  })
}


const handleErrors = err => {
  loading.value = false
  if(err.response) {
    const { status, data } = err.response

    Toast.fire({
      icon: "error",
      title: data.message,
    })

    if (status === 422) {
      setErrors(data.errors)
    } else {
      router.push('/admin/403')
    }
  }
}
</script>

<template>
  <VRow
    class="auth-wrapper bg-surface"
    no-gutters
  >
    <VCol
      class="d-none d-lg-flex auth-bg"
      :style="{ 'background-image': 'url(' + authImg + ')' }"
      lg="8"
    />
    <VCol
      cols="12"
      lg="4"
      class="d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4 w-100"
      >
        <VNodeRenderer :nodes="themeConfig.app.logo" />

        <VCardText v-if="isDataConfirmed == 'send-otp'">
          <h5 class="text-h5 mb-2">
            Forgot Password? 🔒
          </h5>
          <p class="mb-6">
            Enter your {{ resetType == 'email' ? 'email' : 'mobile' }} to reset your password
          </p>

          <div class="d-flex custom-input-switch">
            <label>
              <input
                v-model="resetType"
                type="radio"
                value="mobile"
              >
              <span>Mobile</span>
            </label>
            <label>
              <input
                v-model="resetType"
                type="radio"
                value="email"
                :rules="[requiredValidator, emailValidator]"
              >
              <span> Email</span>
            </label>
          </div>
          <VForm 
            ref="refDataVForm"
            class="mt-7"
            @submit.prevent="onSubmitUserData" 
          >
            <VRow>
              <!-- mobile -->
              <VCol cols="12">
                <VTextField
                  v-if="resetType == 'mobile'"
                  v-model="mobile"
                  class="input-field mobile-field"
                  autofocus
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
                <!-- email -->
                <VTextField
                  v-else
                  v-model="email"
                  class="input-field"
                  prepend-inner-icon="tabler-mail"
                  :rules="[requiredValidator, emailValidator]"
                  :error-messages="formErrors.email"
                  autofocus
                  type="email"
                  label="Email"
                  variant="outlined"
                />
              </VCol>

              <!-- Reset link -->
              <VCol cols="12">
                <VBtn
                  :disabled="!email && !mobile"
                  :loading="loading"
                  block
                  type="submit"
                >
                  {{ $t('ch_password.confirm') }}
                  <template #loader>
                    <span class="custom-loader">
                      <VIcon icon="tabler-refresh" />
                    </span>
                  </template>
                </VBtn>
              </VCol>

              <!-- back to login -->
              <VCol cols="12">
                <RouterLink
                  class="d-flex align-center justify-center"
                  :to="{ name: 'login' }"
                >
                  <VIcon
                    icon="tabler-chevron-left"
                    class="flip-in-rtl"
                  />
                  <span>Back to login</span>
                </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        <VCardText v-if="isDataConfirmed == 'confirm-otp'">
          <AppOTPComponent 
            :forget-password-token="forgetPasswordToken"
            @set-confirm-password="updateDataConfirmed" 
          />
        </VCardText>
        <VCardText v-if="isDataConfirmed == 'confirm-new-password'">
          <h5 class="text-h5 mb-6">
            {{ $t('ch_password.ch_password') }} 🔒
          </h5>
          <VForm 
            ref="refConfirmVForm"
            @submit.prevent="onSubmitConfirmPassword"
          >
            <VRow>
              <VCol cols="12">
                <AppTextField
                  v-model="newPassword"
                  class="input-field"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  :prepend-inner-icon="isPasswordVisible ? 'tabler-lock-off' : 'tabler-lock'"
                  placeholder="Enter New Password"
                  :rules="[requiredValidator, passwordValidator]"
                  autocomplete="on"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  @click:prepend-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="confirmPassword"
                  class="input-field"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  placeholder="Confirm New Password"
                  persistent-placeholder
                  :prepend-inner-icon="isConfirmPasswordVisible ? 'tabler-lock-off' : 'tabler-lock'"
                  :rules="[requiredValidator, confirmedValidator(confirmPassword, newPassword)]"
                  autocomplete="on"
                  :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                  @click:prepend-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>
              <!-- change password -->
              <VCol cols="12">
                <VBtn
                  block
                  type="submit"
                >
                  {{ $t('ch_password.confirm') }}
                </VBtn>
              </VCol>

              <!-- back to login -->
              <VCol cols="12">
                <RouterLink
                  class="d-flex align-center justify-center"
                  :to="{ name: 'login' }"
                >
                  <VIcon
                    icon="tabler-chevron-left"
                    class="flip-in-rtl"
                  />
                  <span>Back to login</span>
                </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";

.auth-bg {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.input-field{
  input{
    text-align: left !important;
    padding-left: 10px !important;
    font-size: 13px !important;
  }
}

.mobile-field{
  .v-field__prepend-inner {
    padding-top: 10px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
