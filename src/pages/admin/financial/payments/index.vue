<template>
  <div class="payments-page">
    <!-- page header -->
    <VRow class="mb-5">
      <VCol cols="12 d-flex justify-space-between ">
        <PageHeader 
          :items="items" 
          :title="title" 
        />
      </VCol>
    </VRow>

    <!-- Search -->
    <VRow class="mb-3">
      <VCol cols="12">
        <VExpansionPanels>
          <VExpansionPanel>
            <VExpansionPanelTitle>
              {{ $t("general.search_btn") }}
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VForm 
                class="mt-5" 
                @submit.prevent="searchData"
              >
                <VRow class="mb-4">
                  <VCol cols="3">
                    <VTextField
                      v-model="resourceUrlParams.ref_number"
                      type="text"
                      @keyup.enter="searchData"
                    />
                  </VCol>
                  <VCol cols="3">
                    <VTextField
                      v-model="resourceUrlParams.ref_number"
                      type="text"
                      @keyup.enter="searchData"
                    />
                  </VCol>
                  <VCol cols="3">
                    <VTextField
                      v-model="resourceUrlParams.ref_number"
                      type="text"
                      @keyup.enter="searchData"
                    />
                  </VCol>
                  <VCol cols="3">
                    <VTextField
                      v-model="resourceUrlParams.ref_number"
                      type="text"
                      @keyup.enter="searchData"
                    />
                  </VCol>
                  <VCol cols="3">
                    <VTextField
                      v-model="resourceUrlParams.ref_number"
                      type="text"
                      @keyup.enter="searchData"
                    />
                  </VCol>
                </VRow>

                <VBtn 
                  color="primary" 
                  size="small" 
                  @click="searchData"
                >
                  {{ $t("general.search_btn") }}
                </VBtn>
              </VForm>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>
    <MainTable
      v-if="renderComponent"
      :headers="headers"
      url="payments"
      :query="resourceUrlParams"
      table-data-type="payments"
    >
      <template #download>
        <VBtn
          :loading="loading"
          @click.prevent="downloadFile(downloadUrl, resourceUrlParams, 'test')"
        >
          <VIcon 
            icon="tabler-download" 
            size="16" 
            class="mx-4 my-2" 
          />
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
import MainTable from "@/components/main-table.vue"
import { nextTick } from "vue"

/* composables */
import { useI18n } from "vue-i18n"
import { useDynamicTable } from "@/composable/useDynamicTable"

const { t } = useI18n()
const { downloadFile, loading } = useDynamicTable()

/* const variables */
const headers = [
  {
    key: "id",
    title: `${t("general.id")}`,
    sortable: true,
  },
  {
    key: "ref_number",
    title: `${t("general.ref_number")}`,
    sortable: false,
  },
  {
    key: "company",
    title: `${t("general.company")}`,
    sortable: true,
    sortKey: "team_id",
  },
  {
    key: "payment_date",
    title: `${t("general.payment_date")}`,
    sortable: true,
  },
  {
    key: "amount",
    title: `${t("general.amount")}`,
    sortable: false,
  },
  {
    key: "payment_type",
    title: `${t("general.payment_type")}`,
    sortable: true,
  },
  { key: "type", title: `${t("general.type")}`, sortable: true },
  {
    key: "proccessing_date",
    title: `${t("general.processing_date")}`,
    sortable: true,
  },
  {
    key: "payment_status_val",
    title: `${t("general.status")}`,
    sortable: true,
    sortKey: "payment_status",
  },
  {
    key: "action",
    title: `${t("general.action")}`,
    sortable: false,
  },
]

const downloadUrl = process.env.VUE_APP_BASE_URL + "reports/accounting-report"


const items = reactive([
  {
    title: 'Dashboard',
    disabled: false,
    href: 'dashboard',
  },
  {
    title: t("menuitems.financial.list.payments.text"),
    disabled: true,
  },
])

/* reactive variable */

const title = ref(`${t('menuitems.financial.list.payments.text')}`)
const renderComponent = ref(true)

const resourceUrlParams = ref({
  size: 10,
  ref_number: null,
  company_ids: [],
  payment_type: "all",
  paymentId: null,
  status: "all",
  date_type: "all",
  date_from: null,
  date_to: null,
  amount_from: null,
  amount_to: null,
})

/* methods */
const searchData = async () => {
  // Here, we'll remove MyComponent
  renderComponent.value = false

  // Then, wait for the change to get flushed to the DOM
  await nextTick()

  // Add MyComponent back in
  renderComponent.value = true
}
</script>

