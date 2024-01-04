<template>
  <div class="business-fields-page">
    <!-- page header -->
    <VRow>
      <VCol cols="12 d-flex justify-space-between">
        <PageHeader
          :items="items"
          :title="title"
        />
      </VCol>
    </VRow>

    <MainTable
      v-if="renderComponent"
      :headers="headers"
      url="business_fields"
      :query="resourceUrlParams"
      table-data-type="business_fields"
      @edit-business-field="editBusinessField"
      @delete-business-field="deleteField"
    >
      <template #custom>
        <VBtn
          size="small"
          :loading="loading"
          @click.prevent="addBussinessField"
        >
          {{ $t('general.add') }} {{ $t('menuitems.settings.list.business_fields') }}
          <template #loader>
            <span class="custom-loader">
              <VIcon icon="tabler-refresh" />
            </span>
          </template>
        </VBtn>
      </template>
    </MainTable>

    <!-- 👉 Edit Dialog  -->
    <VDialog
      v-model="editDialog"
      max-width="600px"
    >
      <VCard>
        <VCardTitle>
          <span class="headline">Edit Business Field</span>
        </VCardTitle>
        <VCardText>
          <VContainer>
            <VRow>
              <!-- fullName -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="name_en"
                  :label="$t('general.name_en')"
                  class="input-field"
                />
              </VCol>

              <!-- email -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="name_ar"
                  :label="$t('general.name_ar')"
                  class="input-field"
                />
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn
            color="error"
            variant="outlined"
            @click="closeEditModal"
          >
            Cancel
          </VBtn>

          <VBtn
            color="success"
            variant="elevated"
            @click="saveEditItem"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- 👉 add Dialog  -->
    <VDialog
      v-model="addDialog"
      max-width="600px"
    >
      <VCard>
        <VCardTitle>
          <span class="headline">add Business Field</span>
        </VCardTitle>
        <VCardText>
          <VContainer>
            <VRow>
              <!-- fullName -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="new_name_en"
                  :label="$t('general.name_en')"
                  class="input-field"
                />
              </VCol>

              <!-- email -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="new_name_ar"
                  :label="$t('general.name_ar')"
                  class="input-field"
                />
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn
            color="error"
            variant="outlined"
            @click="closeAddModal"
          >
            Cancel
          </VBtn>

          <VBtn
            color="success"
            variant="elevated"
            @click="saveAddItem"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>  

<script setup>
import PageHeader from "@/components/page-header.vue"
import MainTable from "@/components/main-table.vue"
import { useI18n } from "vue-i18n"
import { nextTick, ref } from "vue"
import { useBusinessField } from "@/composable/settings/useBusinessField"
import { useToast } from '@/composable/useToast'
import { useGlobalHandleError } from "@/composable/useGlobalHandleError"
import { useInputValidator } from "@/composable/useInputValidator"

const { addBusinessField, updateBusinessField, deleteBusinessField } = useBusinessField()
const { isArabicChar, isEnglishChar } = useInputValidator()
import Swal from "sweetalert2/dist/sweetalert2"
import "sweetalert2/src/sweetalert2.scss"

const { setErrors } = useGlobalHandleError()
const { t } = useI18n()
const { showToast } = useToast()

const title = ref(`${t('general.business_field_list')}`)
const editDialog = ref(false)
const renderComponent = ref(true)
const loading = ref(false)
const addDialog = ref(false)

const name_ar = ref(null)
const name_en = ref(null)
const field_id = ref(null)

const new_name_en = ref(null)
const new_name_ar = ref(null)

const items = reactive([
  {
    title: 'Dashboard',
    disabled: false,
    to: '/',
  },
  {
    title: `${t('general.business_field_list')}`,
    disabled: true,
  },
])


const resourceUrlParams = ref({
  size: 10,
  sortBy: 'id',
  sortDesc: 'DESC',
})

const headers = [
  {
    key: "id",
    title: `${t("general.id")}`,
    sortable: false,
  },
  {
    key: "name_en",
    title: `${t("general.name_en")}`,
    sortable: false,
  },
  {
    key: "name_ar",
    title: `${t("general.name_ar")}`,
    sortable: false,
  },
  {
    key: "action",
    title: `${t("general.action")}`,
    sortable: false,
  },
]

const addBussinessField = () => {
  addDialog.value = true
}

const editBusinessField = data => {
  editDialog.value = true
  name_ar.value = data.name_ar
  name_en.value = data.name_en
  field_id.value = data.id
}

const deleteField = data => {
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
      var allIds = [data.id]
      deleteFields(allIds)
    }
  })
}

const deleteFields = async ids => {
 
  var payload = {
    ids: ids,
  }

  try {
    const response = await deleteBusinessField(payload)
    if (response.status == 200) { 
      renderComponent.value = false
      showToast(response.data.message, { icon: 'success' })
      await nextTick()
      renderComponent.value = true
    }

  } catch (e) { 
    setErrors(e.response.data.errors)
  }
}

const saveEditItem = async () => {

  if (!isArabicChar(name_ar.value)) {
    return showToast( t('error.Business_Name_ar_not_arabic'), { icon: 'error' })
  }

  if (!isEnglishChar(name_en.value)) {
    return showToast( t('error.Business_Name_not_english'), { icon: 'error' })
  }

  let payload = {
    name_ar: name_ar.value,
    name_en: name_en.value,
    id: field_id.value,
  }

  try {
    const response = await updateBusinessField(payload)
    if (response.status == 200) {
      renderComponent.value = false
      showToast(response.data.message, { icon: 'success' })

      await nextTick()
      renderComponent.value = true
      setTimeout(() => {
        editDialog.value = false
      }, 2000)
    }
  } catch (e) {
    setErrors(e)
  }
}

const closeEditModal = () => {
  editDialog.value = false
}

const closeAddModal = () => {
  addDialog.value = false
}

const saveAddItem = async () => {

  if (!isArabicChar(new_name_ar.value)) {
    return showToast( t('error.Business_Name_ar_not_arabic'), { icon: 'error' })
  }

  if (!isEnglishChar(new_name_en.value)) {
    return showToast( t('error.Business_Name_not_english'), { icon: 'error' })
  }

  let payload = {
    name_ar: new_name_ar.value,
    name_en: new_name_en.value,
  }

  try {
    const response = await addBusinessField(payload)
    if (response.status == 200) {
      renderComponent.value = false
      showToast(response.data.message, { icon: 'success' })
      await nextTick()
      renderComponent.value = true
      setTimeout(() => {
        addDialog.value = false
      }, 2000)
    }
  } catch (e) {
    setErrors(e)
  }
}
</script>
