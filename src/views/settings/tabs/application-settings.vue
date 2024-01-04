
<template>
  <div class="application-settings">
    <h4 class="text-dark">
      {{ $t('settings.applications_settings') }}
    </h4>
    <VForm
      ref="refVForm"
      @submit.prevent="onSaveData"
    >
      <VRow class="mt-5">
        <VCol 
          cols="12" 
          md="4"
        >
          <VTextField
            v-model="dailyLimit"
            :label="$t('settings.daily_limit')"
            type="text"
            class="input-field"
            prepend-inner-icon="tabler-device-desktop"
            :rules="requiredValidator"
            variant="outlined"
            @keypress="useNumbersInput($event)"
          />
        </VCol>
        <VCol 
          cols="12" 
          md="4"
        >
          <VTextField
            v-model="monthlyLimit"
            :label="$t('settings.monthly_limit')"
            type="text"
            class="input-field"
            :rules="requiredValidator"
            prepend-inner-icon="tabler-device-desktop"
            variant="outlined"
            @keypress="useNumbersInput($event)"
          />
        </VCol>
        <VCol 
          cols="12" 
          md="4"
        >
          <VTextField
            v-model="totalTransactions"
            :label="$t('settings.total_transaction')"
            type="text"
            class="input-field"
            prepend-inner-icon="tabler-device-mobile"
            :rules="requiredValidator"
            variant="outlined"
            @keypress="useNumbersInput($event)"
          />
        </VCol>
        <VCol 
          cols="12" 
          md="4"
        >
          <VTextField
            v-model="paymentBatchLimit"
            :label="$t('settings.payment_batch_limit')"
            type="text"
            class="input-field"
            prepend-inner-icon="tabler-device-imac"
            variant="outlined"
            :rules="requiredValidator"
            @keypress="useNumbersInput($event)"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VBtn 
            type="submit"
            size="small"
            :loading="loading"
          >
            {{ $t('general.save') }}
            <template #loader>
              <span class="custom-loader">
                <VIcon icon="tabler-refresh" />
              </span>
            </template>
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>

<script setup>
import { requiredValidator } from "@validators"
import { VForm } from "vuetify/components/VForm"
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import { useAppSettings } from "@/composable/settings/useAppSettings"
import { onMounted } from "vue"
import { useToast } from '@/composable/useToast'
import { useNumbersInput } from '@/composable/useNumberInput'


const { getApplicationSettings, updateApplicationSettings } = useAppSettings()
const { showToast } = useToast()
const { setErrors } = useGlobalHandleError()


const refVForm = ref()
const dailyLimit = ref("")
const monthlyLimit = ref("")
const totalTransactions = ref("")
const paymentBatchLimit = ref("")
const loading = ref(false)

const fetchData = async () => {

  try {

    const response = await getApplicationSettings()

    if (response.status == 200) {
      const settingsData = response.data.data

      dailyLimit.value = settingsData.daily_limit
      monthlyLimit.value = settingsData.monthly_limit
      totalTransactions.value = settingsData.total_transactions
      paymentBatchLimit.value = settingsData.payment_batch_limit
    }
  } catch (e) {
    setErrors(e.response.data.errors)
  }
}

const onSaveData = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) saveData()
  })
}

const saveData = async () => {
  loading.value = true

  let payload = {
    daily_limit: dailyLimit.value,
    monthly_limit: monthlyLimit.value,
    total_transactions: totalTransactions.value,
    payment_batch_limit: paymentBatchLimit.value,
  }

  try {

    const response = await updateApplicationSettings(payload)

    if (response.status == 200) { 
      showToast(response.data.message, { icon: 'success' })
    }

    loading.value = false

  } catch (e) { 
    loading.value = false
    setErrors(e.response.data.errors)
  }
}

onMounted(() => {
  fetchData()
})
</script>
