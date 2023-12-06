<script setup>
import authImg from "@images/auth/login.jpg"
import Swal from "sweetalert2/dist/sweetalert2"
import "sweetalert2/src/sweetalert2.scss"
import { VNodeRenderer } from "@layouts/components/VNodeRenderer"
import { themeConfig } from "@themeConfig"
import { useAppAbility } from "@/plugins/casl/useAppAbility"
import { requiredValidator } from "@validators"
import { VForm } from "vuetify/components/VForm"
import { useAuthStore } from "@/store/auth/authStore"
import { useI18n } from "vue-i18n"
import { computed, ref } from "vue"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router"

const { t } = useI18n()
const authStore = useAuthStore()
const { errors, setErrors } = useGlobalHandleError()
const userRefNumber = JSON.parse(localStorage.getItem("user_ref_number"))
const ability = useAppAbility()
const router = useRouter()
const route = useRoute()
const docState = ref('confirm_qr')
const confirmCode  = ref(null)
const confirm_qr = ref(null)
const showForgotRecoveryCode = ref(false)
const session_timeout = ref(false)
const loading = ref(false)

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1600,
  timerProgressBar: true,
})


const confirmRecovery = () => {
  confirm_qr.value = null
  docState.value = 'confirm_recovery'
}

const confirmQrCode = () => {
  confirm_qr.value = null
  docState.value = 'confirm_qr'
  showForgotRecoveryCode.value = false
}

const confirm2FA = async () => {
  try {
    loading.value = true

    const credentials = {
      code: docState.value === 'confirm_qr' ? confirmCode.value : null,
      recovery_code: docState.value === 'confirm_recovery' ? confirm_qr.value : null,
      user_reference_number: userRefNumber,
    }

    const res = await authStore.confirm2FA(credentials)
    
    if (res.status === 200) {

      const userData = res.data.data
      const { access_token, permissions } = userData

      Toast.fire({
        icon: "success",
        title: t("general.login_success"),
      }).then(() => {
        loading.value = false
        
        localStorage.setItem('userAbilities', JSON.stringify(permissions))
        ability.update(permissions)
        localStorage.setItem('userData', JSON.stringify(userData))
        localStorage.setItem('accessToken', JSON.stringify(access_token))

        router.replace(route.query.to ? String(route.query.to) : '/')
      })
    }
  } catch (err) {
    if (err.response) {
      loading.value = false

      const { status, data } = err.response

      Toast.fire({
        icon: "error",
        title: data.message,
      })

      if (status === 422) {
        if (docState.value === 'confirm_qr' || docState.value === 'confirm_recovery') {
          setErrors(data.errors)
        }
      } else if (status === 423) {
        session_timeout.value = true
        setTimeout(() => {
          localStorage.clear()
          window.location.href = '/login'
        }, 2000)
      }
    }
  }
}


const checkQrCode = computed(() => {
  return confirmCode.value === '' || confirmCode.value == null
})

const beforeRouteEnter = async () => {
  // Your logic before entering the route
  
  const must_have_mfa = localStorage.getItem('enable_have2Fa')
  // const accessToken = JSON.parse(localStorage.getItem('accessToken'))
  
  if (!must_have_mfa) {
    window.location.href = '/'
  }
}

beforeRouteEnter()
</script>

<template>
  <VRow 
    no-gutters 
    class="auth-wrapper bg-surface"
  >
    <VCol
      lg="8"
      class="d-none d-lg-flex auth-bg"
      :style="{ 'background-image': 'url(' + authImg + ')' }"
    />

    <VCol
      cols="12"
      lg="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard 
        flat 
        :max-width="500" 
        class="mt-12 mt-sm-0 w-100"
      >
        <VCardText>
          <VNodeRenderer 
            :nodes="themeConfig.app.logo" 
            class="mb-6" 
          />
        </VCardText>
        <VCardText>
          <Transition
            name="bounce" 
            mode="out-in"
          >
            <div 
              v-if="docState === 'confirm_qr'"
              class="confirm_qr" 
            >
              <div class="mb-5">
                <VAlert
                  density="default"
                  color="success"
                  variant="tonal"
                >
                  {{ $t("login.Sign_qr_to_continue") }} 
                </VAlert>
              </div>
              <div class="p-2 mt-2">
                <VForm
                  class="form-horizontal"
                  @submit.prevent="confirm2FA"
                >
                  <div v-if="session_timeout">
                    <VAlert type="error">
                      {{ $t("login.session_timeout") }}
                    </VAlert>
                  </div>
                  <div class="form-group mb-4">
                    <AppTextField
                      v-model="confirmCode"
                      class="input-field"
                      :placeholder="`${$t('ch_password.enter_confirm_qr_code')}`"
                      type="text"
                    />
                  </div>

                  <div class="mt-4 text-center">
                    <VBtn
                      block
                      :loading="loading"
                      type="submit"
                      :disabled="checkQrCode"
                    >
                      {{ $t("ch_password.confirm") }}
                    </VBtn>
                  </div>
                  <div class="mt-4 text-center">
                    <a
                      class="text-muted"
                      style="cursor: pointer"
                      @click="confirmRecovery"
                    >
                      <span>{{
                        $t("login.recovery_code_to_continue")
                      }}</span>
                    </a>
                  </div>
                </VForm>
              </div>
            </div>
          </Transition>
          <Transition 
            name="bounce" 
            mode="out-in"
          >
            <div
              v-if="docState === 'confirm_recovery'"
              class="confirm_qr"
            >
              <div class="mb-5">
                <VAlert 
                  density="default"
                  color="success"
                  variant="tonal"
                >
                  {{ $t("login.Sign_recovery_code_to_continue") }} 
                </VAlert>
              </div>
              <div class="p-2 mt-2">
                <VForm
                  class="form-horizontal"
                  @submit.prevent="confirm2FA"
                >
                  <!-- st show session message -->
                  <div v-if="session_timeout">
                    <VAlert variant="danger">
                      {{ $t("login.session_timeout") }}
                    </VAlert>
                  </div>
                  <!-- nd show session message -->

                  <div class="form-group mb-4">
                    <AppTextField
                      v-model="confirm_qr"
                      class="input-field"
                      :placeholder="`${$t('ch_password.enter_recovery_code')}`"
                      type="text"
                    />
                  </div>

                  <div class="mt-4 text-center">
                    <VBtn
                      block
                      :loading="loading"
                      type="submit"
                      :disabled="checkQrCode"
                    >
                      {{ $t("ch_password.confirm") }}
                    </VBtn>
                  </div>
                  <div class="mt-5 text-center">
                    <a
                      class="text-muted"
                      style="cursor: pointer"
                      @click="confirmQrCode"
                    >
                      <span>{{
                        $t("login.qr_code_to_continue")
                      }}</span>
                    </a>
                  </div>
                  <div class="mt-2 mb-5 text-center">
                    <a
                      class="text-muted"
                      style="cursor: pointer"
                      @click.prevent="showForgotRecoveryCode = true"
                    >
                      <span>{{
                        $t("login.forget_recovery_code")
                      }}</span>
                    </a>
                  </div>

                  <Transition 
                    name="bounce" 
                    mode="out-in"
                  >
                    <VAlert
                      v-if="showForgotRecoveryCode"
                      class="text-center"
                      variant="warning"
                      show=""
                    >
                      {{ $t("login.contact_support") }}

                      <div class="social-icons pt-5">
                        <p>
                          <span
                            style="font-weight: 600"
                            class="text-bold"
                          >
                            info@paymint-eg.com
                          </span>
                          <span> Or </span>
                          <span
                            style="font-weight: 600"
                            class="text-bold"
                          >
                            01550089053
                          </span>
                        </p>
                      </div>
                    </VAlert>
                  </Transition>
                </VForm>
              </div>
            </div>
          </Transition>
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

.bounce-enter-active {
  animation: bounce-in 2s;
}
// .bounce-leave-active {
//   animation: bounce-in 0.2s reverse;
// }
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
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
