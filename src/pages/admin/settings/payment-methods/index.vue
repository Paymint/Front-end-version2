<template>
  <div class="payment-methods-page">
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
      url="payment_methods"
      :query="resourceUrlParams"
      table-data-type="payments"
    >
      <template #custom>
        <VBtn
          :loading="loading"
          size="small"
          @click.prevent="addPaymentMethod"
        >
          Add Payment Method
          <template #loader>
            <span class="custom-loader">
              <VIcon icon="tabler-refresh" />
            </span>
          </template>
        </VBtn>
      </template>
    </MainTable>
  </div>
</template>  

<script setup>
import PageHeader from "@/components/page-header.vue"
import MainTable from "@/components/main-table.vue"
import { nextTick } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const renderComponent = ref(true)
const loading = ref(false)
const title = ref(`${t('menuitems.settings.list.payment_methods')}`)

const resourceUrlParams = ref({
  size: 10,
  name: '',
  type: '',
  value: '',
})

const items = ref([
  {
    title: 'Dashboard',
    disabled: false,
    to: '/',
  },
  {
    title: `${t('menuitems.settings.list.payment_methods')}`,
    disabled: true,
  },
])

/* const variables */
const headers = [
  {
    key: "id",
    title: `${t("general.id")}`,
    sortable: true,
  },
  {
    key: "name",
    title: `${t("general.name")}`,
    sortable: false,
  },
  {
    key: "type",
    title: `${t("general.type")}`,
    sortable: true,
  },
  {
    key: "value",
    title: `${t("general.value")}`,
    sortable: true,
  },
  {
    key: "action",
    title: `${t("general.action")}`,
    sortable: false,
  },
]
</script>
