<script setup>
import { ref } from "vue"
import EgyptIcon from "@images/egypt.png"
import { VForm } from "vuetify/components/VForm"
import { useI18n } from "vue-i18n"
import { useUserStore } from "@/store/agent/useUserStore"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import PinCode from "@/components/Pin.vue"
import Swal from "sweetalert2/dist/sweetalert2"
import "sweetalert2/src/sweetalert2.scss"


const { t } = useI18n()
const UserStore = useUserStore()
const { errors, setErrors } = useGlobalHandleError()

const title = ref(`${t("general.cards")}`)

const linkCardStep = ref('link_step_one')
const nationalId = ref(null)
const mobile = ref(null)
const cardNumber = ref(null)
const refDataVForm = ref(null)
const refCardVForm = ref(null)
const loading = ref(false)
const isPinDialogVisible = ref(false)


const formErrors = ref({
  mobile: undefined,
  nationalId: undefined,
  cardNumber: undefined,
})


const items = [
  {
    title: 'Dashboard',
    disabled: false,
    href: 'dashboard',
  },
  {
    title: t('general.cards'),
    disabled: true,
  },
  {
    title: t('general.add'),
    disabled: true,
  },
]



/* otp */
const checkUserFound = () => {
  loading.value = true
  
  setTimeout(() => {
    isPinDialogVisible.value = true

    loading.value = false

  }, 2000)

}

const linkCard = () => {
  Swal.fire({
    title: "Card Linked Successfully",
    icon: "success",
    confirmButtonText: "Activate Card",
    confirmButtonColor: "#28C76F",
    cancelButtonColor: "#EA5455",
    showCancelButton: true,
  })
}

const verifyData = async data => {
  console.log("DDD")
}

const checkUser = () => {
  refDataVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) checkUserFound()
  })
}

const checkCard = () => {
  refCardVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) linkCard()
  }) 
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

    <VCard v-if="linkCardStep === 'link_step_one'">
      <VCardText>
        <VForm
          ref="refDataVForm"
          class="form-horizontal"
          @submit.prevent="checkUser"
        >
          <VRow>
            <VCol cols="6">
              <VTextField
                v-model="nationalId"
                prepend-inner-icon="tabler-id-badge"
                class="input-field"
                variant="outlined"
                :error-messages="formErrors.nationalId"
                label="National"
                type="text"
              />
            </VCol>
            
            <VCol cols="6">
              <VTextField
                v-model="mobile"
                class="input-field mobile-field"
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
            </VCol>

            <VCol 
              class="d-flex flex-end"
              cols="12"
            >
              <VBtn
                :loading="loading"
                type="submit"
              >
                {{ $t("pin.check") }}
                <template #loader>
                  <span class="custom-loader">
                    <VIcon icon="tabler-refresh" />
                  </span>
                </template>
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VCard v-if="linkCardStep === 'link_step_two'">
      <VCardText>
        <VCardText>
          <VForm
            ref="refCardVForm"
            class="form-horizontal"
            @submit.prevent="checkCard"
          >
            <VRow>
              <VCol 
                cols="6"
                sm="6"  
              >
                <VTextField
                  v-model="cardNumber"
                  prepend-inner-icon="tabler-credit-card"
                  class="input-field"
                  variant="outlined"
                  :error-messages="formErrors.cardNumber"
                  label="Card Number"
                  type="text"
                />
              </VCol>

              <VCol 
                class="d-flex flex-end"
                cols="12"
                sm="6"
              >
                <VBtn
                  :loading="loading"
                  type="submit"
                >
                  {{ $t("general.link_card") }}
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>  
      </VCardText>  
    </VCard>

    <PinCode 
      v-model:isDialogVisible="isPinDialogVisible" 
      pin-type="check"
      @is-verified="verifyData"
    />
  </div>
</template>
