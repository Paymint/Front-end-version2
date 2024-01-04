
<template>
  <div class="holidays-settings">
    <h4 class="text-dark">
      {{ $t('settings.notification_emails') }}
    </h4>

    <VRow class="mt-5">
      <VCol 
        cols="12"
        sm="6"
      >
        <AppSelect
          v-model="selectedEmail"
          :items="emails"
          placeholder="Select Item"
          chips
          closable-chips
          item-title="email"
          item-value="id"
          single-line
        />
      </VCol>
      <VCol 
        cols="12"
        sm="6"
      >
        <VBtn
          :loading="loading"
          @click="addEmail"  
        >
          {{ $t('settings.add_email') }}
          <template #loader>
            <span class="custom-loader">
              <VIcon icon="tabler-refresh" />
            </span>
          </template>
        </VBtn>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th> {{ $t('general.email') }} </th>
              <th> {{ $t('company_profile.tb_actions') }} </th>
            </tr>
          </thead>

          <tbody v-if="tableData && tableData.length > 0">
            <tr
              v-for="item in tableData"
              :key="item.id"
            >
              <td>
                {{ item.email }}
              </td>
              <td>
                <VBtn
                  size="28"
                  color="error"
                  @click="deleteItem(item.id)"
                >
                  <VIcon
                    icon="tabler-trash"
                    size="16"
                  />
                </VBtn>
              </td>
            </tr>
          </tbody>
          <tbody
            v-else
            class="py-5 text-center"
          >
            <tr>
              <td
                colspan="100"
                class="align-middle text-secondary"
              >
                {{ $t('table.no_data_available') }}
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCol>
    </VRow>
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

const { t } = useI18n()
const { updateNotificationSettings, deleteNotificationSetting, getNotificationSettings, getUserEmails } = useAppSettings()
const { showToast } = useToast()
const { setErrors } = useGlobalHandleError()


const selectedEmail = ref(null)
const emails = ref([])
const tableData = ref([])
const loading = ref(false)

const fetchEmails = async () => {
  try {
    const response = await getUserEmails()
    if (response.status == 200) {
      emails.value = response.data.data
      console.log(emails.value)
    }
  } catch (e) {
    setErrors(e.response.data.errors)
  }
}

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

const addEmail = async () => {
  loading.value = true

  let payload = {
    holiday: selectedEmail.value,
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
  fetchData()
  fetchEmails()
})
</script>
