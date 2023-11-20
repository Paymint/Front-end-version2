<template>
  <div class="companies-page">
    <!-- page header -->
    <VRow>
      <VCol cols="12 d-flex justify-space-between ">
        <PageHeader
          :items="items"
          :title="title"
          class="flex-fill"
        >
          <slot>
            <AppTextField
              v-model="searchInput"
              variant="plain"
              prepend-inner-icon="tabler-search"
            />
          </slot>
        </PageHeader>
      </VCol>
    </VRow>
    <!-- transaction status -->
    <VRow
      id="transaction-status"
      class="d-flex justify-space-between mt-10 mx-0"
    >
      <VCol cols="12 ps-0">
        <h6 class="text-h6 mb-6 text-black">
          {{ $t("reports.transaction_status") }}
        </h6>
      </VCol>
      <VCard
        :class="transaction_status_active == null ? 'active-one' : ''"
        @click="changeTransactionStatusField(null)"
      >
        <VCardText class="justify-center">
          <span class="text-black"> {{ $t("general.all") }} </span> :
          {{ cards.all }}
        </VCardText>
      </VCard>
      <VCard
        :class="transaction_status_active == 1 ? 'active-one' : ''"
        @click="changeTransactionStatusField(1)"
      >
        <VCardText class="justify-center">
          <span class="text-black"> {{ $t("companies.active") }} </span> :
          {{ cards.active }}
        </VCardText>
      </VCard>

      <VCard
        :class="transaction_status_active == 2 ? 'active-one' : ''"
        @click="changeTransactionStatusField(2)"
      >
        <VCardText class="justify-center">
          <span class="text-black"> {{ $t("general.Inactive") }} </span> :
          {{ cards.in_active }}
        </VCardText>
      </VCard>
      <VCard
        :class="transaction_status_active == 3 ? 'active-one' : ''"
        @click="changeTransactionStatusField(3)"
      >
        <VCardText class="justify-center">
          <span class="text-black">{{ $t("general.Dorment") }}</span> :
          {{ cards.dormant }}
        </VCardText>
      </VCard>
      <VCard
        :class="transaction_status_active == 4 ? 'active-one' : ''"
        @click="changeTransactionStatusField(4)"
      >
        <VCardText class="justify-center">
          <span class="text-black"> {{ $t("companies.never_used") }} </span> :
          {{ cards.never_use }}
        </VCardText>
      </VCard>
      <VCard
        :class="apiStatus == '1' ? 'active-one' : ''"
        @click="changeStatusField(1)"
      >
        <VCardText class="justify-center">
          <span class="text-black">
            {{ $t("business_dashboard.enable") }}
          </span>
          : {{ cards.enabled }}
        </VCardText>
      </VCard>
      <VCard
        :class="apiStatus == '0' ? 'active-one' : ''"
        @click="changeStatusField(0)"
      >
        <VCardText class="justify-center">
          <span class="text-black">
            {{ $t("business_dashboard.disabled") }}
          </span>
          : {{ cards.disabled }}
        </VCardText>
      </VCard>
    </VRow>
    <!-- companies sections -->

    <VRow class="mt-10">
      <VCol cols="12">
        <VCard class="d-flex justify-start">
          <VCardText class="d-flex flex-fill">
            <span class="ms-3 pt-2">
              <VIcon icon="tabler-list" />
              {{ $t("general.list_view") }}
            </span>
            <span class="ms-3 pt-2">
              <VIcon icon="tabler-grid-dots" />
              {{ $t("general.grid_view") }}
            </span>
          </VCardText>

          <VCardText class="flex-fill add-company">
            <VBtn color="primary mt-6 ">
              {{ $t("general.add_company") }}
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12">
        <ListView :companies-data="companiesData" />
      </VCol>

      <!--
        <VCol cols="12">
        <GridView />
        </VCol> 
      -->
    </VRow>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue"
import PageHeader from "@/components/page-header.vue"
import ListView from "./list-view/index.vue"
import { useI18n } from "vue-i18n"
import CompanyService from "@/services/CompanyService"



const { t } = useI18n()

// import GridView from "./grid-view/index.vue"

/* reactive data */

const title = ref("Clients")
const searchInput = ref("")
const apiStatus = ref('1,0')
const transaction_status_active = ref(null)
const companiesData = ref([])

const cards = ref([])

const items = reactive([
  {
    title: "Dashboard",
    disabled: false,
    href: "dashboard",
  },
  {
    title: t("general.clients"),
    disabled: true,
  },
])

/* methods */

// st get companies with transaction status data
const getComWithTransactionStatus = async () => {
  /******* st get data ******/
  try {
    const response = await CompanyService.getAllTransactionStatus()

    cards.value = response.data
  } catch (err) {
    console.log(err)
  }
}

// change transaction status
const changeTransactionStatusField = transactionStatusId => {
  if (transaction_status_active.value == transactionStatusId) {
    transaction_status_active.value = null
  } else {
    transaction_status_active.value = transactionStatusId
  }
  apiStatus.value = "1,0"

  refreshClientsApi()
}

const changeStatusField = StatusId => {
  if (apiStatus.value == StatusId) {
    apiStatus.value = "1,0"
  } else {
    apiStatus.value = StatusId
  }

  transaction_status_active.value = null

  refreshClientsApi()
}

// get companies
const refreshClientsApi = () => {
  getCompaniesData()
}

const getCompaniesData = async () => {
  try {
    const response = await CompanyService.getAllCompanies(transaction_status_active.value, apiStatus.value)

    companiesData.value = response.data
  } catch (err) {
    console.error(err)
  }

  /******* nd get data ******/
}


/*** Mounted ****/
onMounted(() => {
  getComWithTransactionStatus()
  getCompaniesData()
})
</script>


<style lang="scss">
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.active-one {
  color: rgb(var(--v-theme-primary)) !important;
  opacity: 1;

  span {
    color: rgb(var(--v-theme-primary)) !important;
  }
}

.add-company {
  text-align: end;
}
</style>
