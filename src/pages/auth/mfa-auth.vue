<script setup>
import authImg from "@images/auth/login.jpg"
import Swal from "sweetalert2/dist/sweetalert2"
import "sweetalert2/src/sweetalert2.scss"
import { VNodeRenderer } from "@layouts/components/VNodeRenderer"
import { themeConfig } from "@themeConfig"
import { requiredValidator } from "@validators"
import { VForm } from "vuetify/components/VForm"
import { useAuthStore } from "@/store/auth/authStore"
import { useI18n } from "vue-i18n"
import { computed, ref } from "vue"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"

const { t } = useI18n()
const authStore = useAuthStore()
const { setErrors } = useGlobalHandleError() 
const userRefNumber = JSON.parse(localStorage.getItem("user_ref_number"))

const codes = ref([])
const qrimage = ref(null)
const showQrCodeForm = ref("generateForm")
const showCodesAlert = ref(false)
const loading = ref(false)
const confirmCode  = ref(null)
const isGenerated = ref(true)

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1900,
  timerProgressBar: true,
})

const generateQrCode = async() => {
  loading.value = true
  try {
    const credentials = {
      user_reference_number: userRefNumber,
    }

    const response = await authStore.enableMfa(credentials)

    if(response.data.data.is_two_factor_confirmed == 0) {
      const responseAwaited =  await authStore.generateQrCode(userRefNumber)

      loading.value = false
      isGenerated.value = false
      generateRecoveryCode()
      qrimage.value = responseAwaited.data.svg
      showQrCodeForm.value = 'form'
    }

  } catch (err) {
    if(err.response.status == 422){
      setErrors(err.response.data.errors)
      loading.value = false
    }
  }
}

const generateRecoveryCode = async () => {
  try {
    const response = await authStore.generateRecoveryCode(userRefNumber)

    codes.value = response.data
  } catch (err) {
    if(err.response.status == 422){
      setErrors(err.response.data.errors)
      loading.value = false
    }
  }
}

const checkConfirmationCode = async () => {
  loading.value = true
  try {
    const QrData = {
      code: confirmCode.value,
      user_reference_number: userRefNumber,
    }

    const response =  await authStore.confirmCode(QrData)

    if (response.status == 200){
      Toast.fire({
        icon: "success",
        title: t("general.confirmed_success"),
      }).then(() => {
        loading.value = false
        localStorage.clear()
        window.location.href = '/login'
      })
    }
  }
  catch (err){
    if(err.response.status == 422){
      loading.value = false
      setErrors(err.response.data.errors)
    }
  }
}

const checkQrCode = computed(() => {
  return confirmCode.value === '' || confirmCode.value == null
})
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
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <VNodeRenderer 
            :nodes="themeConfig.app.logo" 
            class="mb-6" 
          />
          <p 
            v-if="isGenerated"
            class="mb-4"
          >
            Please generate your QR Code and Recovery Code to start the adventure
          </p>
          <p 
            v-else
            class="mb-4"
          >
            Please confirm QR Code and save your Recovery Codes
          </p>
        </VCardText>
        <VCardText>
          <Transition 
            name="bounce" 
            mode="out-in" 
          >
            <div class="scan_qr text-center">
              <VBtn 
                v-if="showQrCodeForm === 'generateForm'" 
                class="mt-4 w-100" 
                :loading="loading"
                @click="generateQrCode"
              >
                Generate
                <template #loader>
                  <span class="custom-loader">
                    <VIcon icon="tabler-refresh" />
                  </span>
                </template>
              </VBtn>                      
              <Transition 
                name="bounce" 
                mode="out-in"
              >             
                <VForm 
                  v-if="showQrCodeForm === 'form'"
                  @submit.prevent="checkConfirmationCode"
                >
                  <div class="generate-qr">
                    <div
                      class="qrImage" 
                      v-html="qrimage"
                    />
                  </div>
                  <div class="form-group mt-3">
                    <AppTextField
                      v-model="confirmCode"
                      :placeholder="`${$t('ch_password.enter_confirm_qr_code')}`"
                      type="text"
                    />
                  </div>
                  <div class="my-4">
                    <VBtn 
                      block
                      :loading="loading"
                      type="submit"
                      :disabled="checkQrCode"
                    > 
                      {{ $t('ch_password.confirm') }}
                      <template #loader>
                        <span class="custom-loader">
                          <VIcon icon="tabler-refresh" />
                        </span>
                      </template>
                    </VBtn>
                  </div>                    
                  <div class="recovery-codes">                           
                    <a 
                      style="cursor: pointer; display: block;" 
                      class="font-weight-bold text-warning mb-5" 
                      @click.prevent="showCodesAlert = true"
                    >Show Recovery Codes</a>

                    <Transition 
                      name="bounce" 
                      mode="out-in"
                    >
                      <VAlert
                        v-if="showCodesAlert"
                        class="text-left"
                        color="primary" 
                        variant="tonal"
                      >
                        <template v-if="codes.length">
                          <p
                            v-for="code in codes"
                            :key="code.index"
                            class="text-success"
                          >
                            {{ code }}
                          </p>
                        </template>
                      </VAlert>
                    </Transition>
                  </div>  
                </VForm>
              </Transition>
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
.bounce-leave-active {
  animation: bounce-in 0.2s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.10);
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
