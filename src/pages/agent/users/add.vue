<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import CheckUserFound from "@/components/CheckUserFound.vue"
import GeneralOTP from "@/components/OTPDialog.vue"
import UploadID from "./UploadID.vue"

const { t } = useI18n()

const title = ref(`${t("general.add")}`)

const registerUserStep = ref('reg_step_one')
const isOtpDialogVisible = ref(false)


const items = [
  {
    title: 'Dashboard',
    disabled: false,
    href: 'dashboard',
  },
  {
    title: t('general.users'),
    disabled: true,
  },
  {
    title: t('general.add'),
    disabled: true,
  },
]

const userFound = () => {
  isOtpDialogVisible.value = true
}

/* otp */
const updateStep = data => {
  registerUserStep.value = data
}
</script>

<template>
  <div class="add-user">
    <VRow class="mb-5">
      <VCol cols="12 d-flex justify-space-between ">
        <PageHeader 
          :items="items" 
          :title="title"
        />
      </VCol>
    </VRow>

    <VCard v-if="registerUserStep === 'reg_step_one'">
      <VCardText>
        <CheckUserFound @user-found="userFound" />
      </VCardText>
      <GeneralOTP 
        v-model:isDialogVisible="isOtpDialogVisible"
        :token="forgetPasswordToken"
        :mobile-number="mobile"
        @set-new-step="updateStep" 
      />
    </VCard>

    <VCard v-if="registerUserStep === 'reg_step_two'">
      <VCardText>
        <UploadID />
      </VCardText>  
    </VCard>
  </div>
</template>
