<template>
  <div class="requests-page">
    <!-- page header -->
    <VRow>
      <VCol cols="12 d-flex justify-space-between ">
        <PageHeader :items="items" :title="title" />
      </VCol>
    </VRow>

    <MainTable
      :headers="headers"
      url="company/company-request"
      :query="resourceUrlParams"
      table-data-type="requests"
    >
    </MainTable>
  </div>
</template>  

<script setup>
import PageHeader from "@/components/page-header.vue"
import { ref } from "vue"
import MainTable from "@/components/main-table.vue"

/* composables */
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const title = ref(`${t("request.Companies_Request_List.text")}`)

const resourceUrlParams = ref({
  size: 10,
  sortBy: "id",
  sortDesc: true,
})


/* const variables */
const headers = [
  {
    key: "id",
    title: `${t("general.id")}`,
    sortable: true,
  },
  { key: "name", title: `${t("general.company")}`, sortable: true },
  { key: "full_name", title: `${t("general.full_name")}`, sortable: true },
  { key: "mobile_number", title: `${t("general.phone")}`, sortable: true },
  {
    key: "business_field",
    title: `${t("menuitems.settings.list.business_fields")}`,
    sortKey: "business_field_id",
    sortable: true,
  },
  { key: "area", title: `${t("general.area")}`, sortable: true },
  {
    key: "status",
    title: `${t("general.status")}`,
    sortKey: "manager_assigned_at",
    sortable: true,
  },
  {
    key: "manager",
    title: `${t("general.agent")}`,
    sortKey: "manager_id",
    sortable: true,
  },
  { key: "action", title: `${t("general.action")}`, sortable: false },
]

const items = [
  {
    title: "Dashboard",
    disabled: false,
    href: "dashboard",
  },
  {
    title: `${t("request.Companies_Request_List.requests")}`,
    disabled: true,
  },
]
</script>
