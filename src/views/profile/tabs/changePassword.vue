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

const { t } = useI18n()
const authStore = useAuthStore()
const oldPassword = ref("")
const password = ref("")
const repeatPassword = ref("")
const isOldPasswordVisible = ref(false)
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const refForm = ref()
const formErrors = ref([])

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
})

const changePassword = async () => {

  const res = await refForm.value?.validate()

  if(res.valid){
    try {
      const credentials = {
        current_password: oldPassword.value,
        password: password.value,
        password_confirmation: repeatPassword.value,
      }
  
      const response = await authStore.changePasswordProfile(credentials)
      if (response.data.errors.length < 1) {
        Toast.fire({
          icon: "success",
          title: t("general.password_changed_successfully"),
        })
      }
    } catch (err) {
      if (err.response.status === 422) {
        Object.keys(err.response.data.errors).forEach(key => {
          const obj = {
            val: err.response.data.errors[key],
          }

          formErrors.value.push(
            Toast.fire({
              icon: "error",
              title: obj.val,
            }),
          )      
        })
      }
    }
  }

}
</script>

<template>
  <VCard>
    <VForm 
      ref="refForm" 
      @submit.prevent="changePassword"
    >
      <VCardItem>
        <VRow class="pa-4">
          <VCol cols="12">
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
          <VCol cols="12">
            <AppTextField
              v-model="password"
              persistent-placeholder
              placeholder="password"
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

          <VCol cols="12">
            <AppTextField
              v-model="repeatPassword"
              persistent-placeholder
              placeholder="repeat password"
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
            <VBtn type="submit">
              {{ t("ch_password.confirm") }}
            </VBtn>
          </VCol>
        </VRow>
      </VCardItem>
    </VForm>
  </VCard>
</template>
