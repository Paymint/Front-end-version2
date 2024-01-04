
<template>
  <div class="holidays-settings">
    <h4 class="text-dark">
      {{ $t('settings.monthly_goals') }}
    </h4>

    <VForm
      ref="refVForm"
      @submit.prevent="onSaveData"
    >
      <VRow class="mt-5">
        <VCol 
          cols="12"
          md="3"
        >
          <VTextField
            v-model="total_onboarding_goals"
            :label="$t('settings.goals.total_onboarding_goals')"
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
          md="3"
        >
          <VTextField
            v-model="total_cards_goals"
            :label="$t('settings.goals.total_cards_goals')"
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
          md="3"
        >
          <VTextField
            v-model="total_revenue_goals"
            :label="$t('settings.goals.total_revenue_goals')"
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
          md="3"
        >
          <VTextField
            v-model="month_year"
            :label="$t('settings.goals.month_year')"
            type="text"
            class="input-field"
            prepend-inner-icon="tabler-device-desktop"
            :rules="requiredValidator"
            variant="outlined"
            @keypress="useNumbersInput($event)"
          />
        </VCol>
        <VCol cols="12">
          <VBtn
            size="small"
            :loading="loading"
            @click="saveData"  
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
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import { useAppSettings } from "@/composable/settings/useAppSettings"
import { onMounted } from "vue"
import { useToast } from '@/composable/useToast'
import Swal from "sweetalert2/dist/sweetalert2"
import "sweetalert2/src/sweetalert2.scss"
import { useI18n } from "vue-i18n"
import { requiredValidator } from "@validators"
import { VForm } from "vuetify/components/VForm"

const { t } = useI18n()
const { updateNotificationSettings, deleteNotificationSetting, getNotificationSettings } = useAppSettings()
const { showToast } = useToast()
const { setErrors } = useGlobalHandleError()


const tableData = ref([])
const refVForm = ref()
const month_year = ref("")
const total_cards_goals = ref("")
const total_onboarding_goals = ref("")
const total_revenue_goals = ref("")
const loading = ref(false)

const fetchData = async () => {
  try {
    const response = await getNotificationSettings()
    if (response.status == 200) {
      tableData.value = response.data.data
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
    month_year: month_year.value,
    total_cards_goals: total_cards_goals.value,
    total_onboarding_goals: total_onboarding_goals.value,
    total_revenue_goals: total_revenue_goals.value,
  }

  try {

    const response = await updateNotificationSettings(payload)

    if (response.status == 200) { 
      showToast(response.data.message, { icon: 'success' })
      await fetchData()
    }

    loading.value = false

  } catch (e) { 
    loading.value = false
    setErrors(e.response.data.errors)
  }
}

const deleteItem = id => {
  Swal.fire({
    title: t('delete_modal.title'),
    text: t('delete_modal.text'),
    icon: "warning",
    confirmButtonColor: "#34c38f",
    cancelButtonColor: "#f46a6a",
    confirmButtonText: t('delete_modal.confirmButtonText'),
    cancelButtonText: t('delete_modal.cancelButtonText'),
    showCancelButton: true,
  }).then(result => {
    if (result.value) {
      var allIds = [id]
      deleteEmails(allIds)
    }
  })
}

const deleteEmails = async ids => {

  var payload = {
    ids: ids,
  }

  try {
    const response = await deleteNotificationSetting(payload)
    if (response.status == 200) { 
      showToast(response.data.message, { icon: 'success' })
      await fetchData()
    }

  } catch (e) { 
    setErrors(e.response.data.errors)
  }
}

onMounted(() => {
  // fetchData()
})
</script>
