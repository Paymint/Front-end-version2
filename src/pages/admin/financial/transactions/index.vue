<template>
  <div class="transactions-page">
    <!-- page header -->
    <VRow class="mb-5">
      <VCol cols="12 d-flex justify-space-between ">
        <PageHeader 
          :items="items" 
          :title="title" 
        />
      </VCol>
    </VRow>

    <MainTable 
      :headers="headers" 
      url="transactions" 
      :query="resourceUrlParams"
      table-data-type="transactions" 
    />
  </div>
</template>  

<script setup>
import PageHeader from "@/components/page-header.vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()


/* const variables */
const title = `${t("menuitems.financial.list.transactions.text")}`

const items = [
  {
    title: "Dashboard",
    disabled: false,
    href: "dashboard",
  },
  {
    title: t("menuitems.financial.list.transactions.text"),
    disabled: true,
  },
]

const headers = [
  {
    key: "transaction_time",
    title: `${t("transaction.transaction_time")}`,
    sortable: true,
    sortKey: "created_at",
  },
  {
    key: "debit",
    title: `${t("transaction.Debit")}`,
    sortable: false,
  },
  {
    key: "credit",
    title: `${t("transaction.Credit")}`,
    sortable: false,
  },
  {
    key: "reason",
    title: `${t("transaction.Reason")}`,
    sortable: false,
  },
]
</script>
