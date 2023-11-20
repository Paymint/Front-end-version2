<template>
  <VCard>
    <VCardItem>
      <VCardTitle class="d-flex align-center flex-wrap gap-4 mb-10">
        <div class="flex-fill export-btn">
          <!-- 👉 Export invoice -->
          <slot name="download" />
        </div>
      </VCardTitle>
      <VDataTableServer
        :headers="headers"
        :items="tableData"
        :items-per-page="props.pageSize"
        :page="currentPage"
        :total-items="totalRows"
        @update:model-value="updatePage"
      >
        <!-- handle route -->

        <!-- handle payments -->
        <template 
          v-if="props.tableDataType == 'payments'"
          #item.id="{ item }" 
        >
          <RouterLink :to="{ name: 'admin-dashboard', params: { id: item.raw.id } }">
            #{{ item.raw.id }}
          </RouterLink>
        </template>

        <!-- handle status variant -->
        <template
          v-if="props.tableDataType == 'payments'"
          #item.payment_status_val="{ item }"
        >
          <VChip
            :color="resolveStatusVariant(item.raw.payment_status_val)"
            density="comfortable"
            class="font-weight-medium pa-3"
            size="small"
          >
            {{ item.raw.payment_status_val }}
          </VChip>
        </template>

        <template
          v-if="props.tableDataType == 'payments'"
          #item.status="{ item }"
        >
          <VChip
            :color="resolveStatusVariant(item.raw.status)"
            density="comfortable"
            class="font-weight-medium pa-3"
            size="small"
          >
            {{ item.raw.status }}
          </VChip>
        </template>

        <!-- <template #item.amount="{ item }" v-if="props.tableDataType == 'requests'">
          {{ numberWithCommas(item.raw.amount,$t('company_dashboard.egp')) }}
        </template>  -->

        <!-- handle Actions -->
        <!-- Actions -->
        <!-- <template #item.action="{ item }">
          <MoreBtn
            :menu-list="computedMoreList(item.raw.id)"
            color="undefined"
            item-props
          />
        </template> -->



        <!-- handle transactions -->
        <template 
          v-if="props.tableDataType == 'transactions'"
          #item.credit="{ item }"
        >
          {{ numberWithCommas(item.raw.credit,$t('company_dashboard.egp')) }}
        </template>
        <template 
          v-if="props.tableDataType == 'transactions'"
          #item.balance_after="{ item }"
        >
          {{ numberWithCommas(item.raw.balance_after,$t('company_dashboard.egp')) }}
        </template> 


        <!-- pagination -->
        <template #bottom>
          <VCardText class="mt-5 pagination-style">
            <VRow>
              <VCol 
                lg="12" 
                cols="12"
              >
                <div class="results-showing">
                  showing <strong>{{ fromRecord }}</strong> -
                  <strong>{{ toRecord }}</strong> of
                  <strong>{{ totalRows }}</strong> results
                </div>
                <div 
                  v-if="totalRows > 10"
                  class="dataTables_paginate"
                >
                  <VPagination
                    v-model="currentPage"
                    :length="Math.ceil(totalRows / props.pageSize)"
                    total-visible="7"
                    @update:model-value="updatePage"
                  />
                </div>
                <div class="clearfix" />
              </VCol>
            </VRow>
          </VCardText>
        </template>
      </VDataTableServer>
    </VCardItem>
  </VCard>
</template>

<script setup>
import { useDynamicTable } from "@/composable/useDynamicTable"
import { VDataTableServer } from "vuetify/labs/VDataTable"
import { useStatusVariant } from "@/composable/useStatusVariant"
import { builderQuery } from "@/composable/useQueryBuilder"
import { useNmberWithCommas } from "@/composable/useNumberWithCommas"

/* props */
const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  tableTitle: {
    type: String,
    default: null,
  },
  query: {
    type: Object,
  },
  tableDataType: {
    type: String,
  },
})

/** use composables */
const resParams = builderQuery(props.query)

const { tableData, currentPage, totalRows, updatePage, fromRecord, toRecord } = useDynamicTable(props.headers, props.url, resParams.value)

const { resolveStatusVariant } = useStatusVariant()
const { numberWithCommas } = useNmberWithCommas()

/* computed */
const computedMoreList = computed(() => {
  return (paramId) => [
    {
      title: "Delete",
      value: "delete",
      prependIcon: "tabler-trash",
    },
    {
      title: "Edit",
      value: "edit",
      prependIcon: "tabler-pencil",
    },
    {
      title: "View",
      value: "view",
      prependIcon: "tabler-eye",
    },
  ]
})
</script>

<style scoped>
.export-btn {
  text-align: end
}
</style>
