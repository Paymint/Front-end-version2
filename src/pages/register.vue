<script setup>
import { VForm } from 'vuetify/components/VForm'
import authImg from "@images/auth/login.jpg"
import { useAppAbility } from '@/plugins/casl/useAppAbility'
import { useEgyptPhoneNumber } from "@/composable/useEgyptPhoneNumber"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import { useAuthStore } from "@/store/auth/authStore"
import { useI18n } from "vue-i18n"
import axios from '@axios'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { requiredValidator, passwordValidator, confirmedValidator  } from "@validators"
import EgyptIcon from "@images/egypt.png"
import { onMounted } from 'vue'

const { t } = useI18n()
const { errors, setErrors } = useGlobalHandleError()
const { checkIfEgyptPhoneNumber } = useEgyptPhoneNumber()
const authStore = useAuthStore()

// data ref
const refVForm = ref()
const refOTPVForm = ref()
const mobile = ref('')
const nationalID = ref('')
const password = ref('')
const confirmPassword = ref('')
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const privacyPolicies = ref(true)
const registerd_data = ref('register-otp')
const loading = ref(false)
const timer = ref(50)
const otpNumber = ref(null)

// Router
const route = useRoute()
const router = useRouter()

// Ability
const ability = useAppAbility()

// Form Errors
const registerErrors = ref({
  mobile: undefined,
  nationalID: undefined,
  password: undefined,
  confirmPassword: undefined,
})

const updateOtp = data => {
  if (data.length === 6) {
    isOtpCompleted.value = true
    otpNumber.value = data
  }else {
    isOtpCompleted.value = false
  }
}


const registerUser = async () => {
  loading.value = true
  try {

    let credentials = {
      mobile_number: mobile.value,
      national_id: nationalID.value,
      source: 'web',
    }
    const response = await authStore.registerUser(credentials)

    console.log(response)

    // if(response.errors.length < 1){
    //   registerd_data.value = 'confirm-otp'
    //   loading.value = false
    // }
  } catch (e) {
    console.log(e)

    // handleErrors(e)
  }
}

const confirmOTPData = async () => {
  loading.value = true

  if(timer.value == 0) {
    return Toast.fire({
      icon: "warning",
      title: t("forgot_password.OTP_expire"),
    })
  }

  try {
    const credentials = {
      otp: otpNumber.value,
      forget_password_token: forget_password_token.value,
    }

    const response = await authStore.sendOTP(credentials)
    if(response.errors.length < 1) {
      isDataConfirmed = 'confirm-new-password'
      loading.value = false
    }
  } catch (err) {
    handleErrors(err)
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

const zeroPadded = num => {
  return num < 10 ? `0${num}` : num
}


const register = () => {
  axios.post('/auth/register', {
    username: username.value,
    email: email.value,
    password: password.value,
  }).then(r => {
    const { accessToken, userData, userAbilities } = r.data

    localStorage.setItem('userAbilities', JSON.stringify(userAbilities))
    ability.update(userAbilities)
    localStorage.setItem('userData', JSON.stringify(userData))
    localStorage.setItem('accessToken', JSON.stringify(accessToken))

    // Redirect to `to` query if exist or redirect to index route
    router.replace(route.query.to ? String(route.query.to) : '/')
    
    return null
  }).catch(e => {
    const { errors: formErrors } = e.response.data

    errors.value = formErrors
    console.error(e.response.data)
  })
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

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      registerUser()
  })
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
  <VRow
    no-gutters
    class="auth-wrapper bg-surface"
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
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="mb-0"
          />
        </VCardText>
          
        <VCardText v-if="registerd_data == 'register-otp'">
          <h5 class="text-h5 mb-1">
            Adventure starts here 🚀
          </h5>
          <p class="mb-6">
            Make your app management easy and fun!
          </p>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- mobile -->
              <VCol cols="12">
                <VTextField
                  v-model="mobile"
                  class="input-field mobile-field"
                  autofocus
                  :error-messages="registerErrors.mobile"
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

              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="nationalID"
                  prepend-inner-icon="tabler-id-badge"
                  class="input-field"
                  variant="outlined"
                  :error-messages="registerErrors.nationalID"
                  label="National"
                  type="text"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <div class="d-flex align-center mt-2 mb-4">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="privacyPolicies"
                    :rules="[requiredValidator]"
                    inline
                  >
                    <template #label>
                      <span class="me-1">
                        I agree to
                        <a
                          href="javascript:void(0)"
                          class="text-primary"
                        >privacy policy & terms</a>
                      </span>
                    </template>
                  </VCheckbox>
                </div>

                <VBtn
                  block
                  type="submit"
                  :loading="loading"
                >
                  Sign up
                  <template #loader>
                    <span class="custom-loader">
                      <VIcon icon="tabler-refresh" />
                    </span>
                  </template>
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-center text-base"
              >
                <span>Already have an account?</span>
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'login' }"
                >
                  Sign in
                </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        <VCardText v-if="isDataConfirmed == 'confirm-otp'">
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
                  :loading="loading"
                  type="submit"
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
