<script setup>
import { useAppAbility } from "@/plugins/casl/useAppAbility"
import axios from "@axios"
import { VNodeRenderer } from "@layouts/components/VNodeRenderer"
import { themeConfig } from "@themeConfig"
import { requiredValidator } from "@validators"
import { VForm } from "vuetify/components/VForm"
import { useRouter } from "vue-router"
import authImg from "@images/auth/login.jpg"

const isPasswordVisible = ref(false)
const route = useRoute()
const router = useRouter()
const ability = useAppAbility()

const errors = ref({
  user_name: undefined,
  password: undefined,
})

const refVForm = ref()
const user_name = ref("newAgent")
const password = ref("12345678")
const rememberMe = ref(false)
const loading = ref(false)

const baseUrl = process.env.VUE_APP_BASE_URL

const login = () => {
  loading.value = true
  axios
    .post(baseUrl + "agent-login", {
      user_name: user_name.value,
      password: password.value,
      source: 'web',
    })
    .then( r => {

      const response = r.data.data

      if (response.must_have_2fa && response.must_have_2fa == 1) {
        localStorage.setItem('enable_have2Fa', response.enable_2fa)
        localStorage.setItem('user_ref_number', response.user_reference_number)
        loading.value = false
        if (response.enable_2fa == 0) {
          router.push("auth/mfa-auth")
        }

        if (response.enable_2fa == 1) {
          router.push("auth/mfa-auth-login")
        }
      } else {
        const { access_token, permissions } = response
       
        localStorage.setItem('userAbilities', JSON.stringify(permissions))
        ability.update(permissions)
        localStorage.setItem('userData', JSON.stringify(response))
        localStorage.setItem('accessToken', JSON.stringify(access_token))

        
        router.replace(route.query.to ? String(route.query.to) : '/')

      }
    }).catch(() => {
      loading.value = false
    })
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) login()
  })
}
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

          <h5 class="text-h5 mb-1">
            Welcome to
            <span class="text-capitalize"> {{ themeConfig.app.title }} </span>!
            👋🏻
          </h5>
          <p class="mb-0">
            Please sign-in to your account and start the adventure
          </p>
        </VCardText>
        <VCardText>
          <VForm 
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- user_name -->
              <VCol cols="12">
                <VTextField
                  v-model="user_name"
                  class="input-field"
                  prepend-inner-icon="tabler-user"
                  label="Username"
                  variant="outlined"
                  type="text"
                  autofocus
                  :rules="[requiredValidator]"
                  :error-messages="errors.user_name"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="password"
                  class="input-field"
                  prepend-inner-icon="tabler-lock"
                  label="Password"
                  variant="outlined"
                  :rules="[requiredValidator]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                  <VCheckbox 
                    v-model="rememberMe" 
                    label="Remember me" 
                  />
                  <RouterLink
                    class="text-primary ms-2 mb-1"
                    :to="{ name: 'forgot-password' }"
                  >
                    Forgot Password?
                  </RouterLink>
                </div>

                <VBtn 
                  block 
                  type="submit"
                  :loading="loading"
                > 
                  Login
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
                class="text-center"
              >
                <span>New on our platform?</span>
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'register' }"
                >
                  Create an account
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
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
