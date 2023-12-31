<script setup>
import BranchesTab from '@/views/company/view/tabs/branchesTab.vue'
import PaymentGroupTab from '@/views/company/view/tabs/paymentGroupTab.vue'
import AdminTab from '@/views/company/view/tabs/adminsTab.vue'
import DocumentsTab from '@/views/company/view/tabs/documentsTab.vue'
import AccountSettingsTab from '@/views/company/view/tabs/accountSettingsTab.vue'
import PayoutPackagesTab from '@/views/company/view/tabs/payoutPackagesTab.vue'
import CompanyBioProfile from '@/views/company/view/tabs/companyBioProfile.vue'
import { useI18n } from "vue-i18n"
import { useUserListStore } from '@/views/company/useUserListStore'


const { t } = useI18n()

const companyTab = ref(null)


/* const variable */
const tabs = [
  {
    icon: 'tabler-git-merge',
    title: 'Branches',
  },
  {
    icon: 'tabler-cash',
    title: 'Payment Groups',
  },
  {
    icon: 'tabler-users',
    title: 'Admins',
  },
  {
    icon: 'tabler-file-analytics',
    title: 'Documents',
  },
  {
    icon: 'tabler-settings',
    title: 'Account Settings',
  },
  {
    icon: 'tabler-credit-card',
    title: 'Payout Packages',
  },
]

const items = [
  {
    title: 'Dashboard',
    disabled: false,
    to: '/',
  },
  {
    title: `${t('menuitems.companies.text')}`,
    disabled: false,
    href: 'companies',
  },
  {
    title: `${t('general.com_details')}`,
    disabled: true,
  },
]

const title = `${t('general.com_details')}`

const userListStore = useUserListStore()
const route = useRoute()
const userData = ref()

userListStore.fetchUser(Number(route.params.id)).then(response => {
  userData.value = response.data
})
</script>

<template>
  <div class="company-details">
    <VRow class="mb-5">
      <VCol cols="12 d-flex justify-space-between ">
        <PageHeader
          :items="items"
          :title="title"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol
        cols="12"
        sm="5"
        lg="4"
      >
        <CompanyBioProfile />
      </VCol>

      <VCol
        cols="12"
        sm="7"
        lg="8"
      >
        <VCard class="mb-15">
          <VRow>
            <VCol
              cols="12"
              lg="4"
              md="6"
              sm="12"
            >
              <!-- active account -->
              <VCardText class="d-flex flex-row">
                <VIcon
                  icon="tabler-circle-check-filled"
                  color="primary"
                  size="34"
                  class="flex-fill mt-2"
                />
                <h6 class="text-h5 text-black flex-fill">
                  {{ $t('general.active_account') }}
                  <p class="text-body-2">
                    22 August, 2023
                  </p>
                </h6>
              </VCardText>   
            </VCol>
            <VCol
              cols="12"
              lg="4"
              md="6"
              sm="12"
            >
              <!-- active account -->
              <VCardText class="d-flex flex-row">
                <VIcon
                  icon="tabler-currency-pound"
                  size="34"
                  class="flex-fill mt-2"
                  color="primary"
                />
                <h6 class="text-h5 text-black flex-fill">
                  <!--
                    <span v-if="transaction_status == 1">{{$t('general.active')}}</span>
                    <span v-if="transaction_status == 2">{{$t('general.Inactive')}}</span>
                    <span v-if="transaction_status == 3">{{$t('general.Dorment')}}</span>
                    <span v-if="transaction_status == 4">{{$t('general.never_used')}}</span> 
                  -->
                  {{ $t('general.transaction') }}
                  <p class="text-body-2">
                    25
                  </p>
                </h6>
              </VCardText>  
            </VCol>
            <VCol
              cols="12"
              lg="4"
              md="6"
              sm="12"
            >
              <!-- active account -->
              <VCardText class="d-flex flex-row">
                <VIcon
                  icon="tabler-user-circle"
                  size="34"
                  class="flex-fill mt-2"
                  color="primary"
                />
                <h6 class="text-h5 text-black flex-fill"> 
                  {{ $t('general.total_payees') }}
                  <p class="text-body-2">
                    25 payees
                  </p>
                </h6>
              </VCardText>   
            </VCol>
          </VRow>
        </VCard>
        <VRow>
          <VCol cols="12">
            <VTabs
              v-model="companyTab"
              class="v-tabs-pill"
            >
              <VTab
                v-for="tab in tabs"
                :key="tab.icon"
              >
                <VIcon
                  :size="18"
                  :icon="tab.icon"
                  class="me-1"
                />
                <span style="font-size: 14px;">{{ tab.title }}</span>
              </VTab>
            </VTabs>

            <VWindow
              v-model="companyTab"
              class="mt-6 disable-tab-transition"
              :touch="false"
            >
              <VWindowItem>
                <BranchesTab />
              </VWindowItem>
              <VWindowItem>
                <PaymentGroupTab />
              </VWindowItem>

              <VWindowItem>
                <AdminTab />
              </VWindowItem>

              <VWindowItem>
                <DocumentsTab />
              </VWindowItem>

              <VWindowItem>
                <AccountSettingsTab />
              </VWindowItem>

              <VWindowItem>
                <PayoutPackagesTab />
              </VWindowItem>
            </VWindow>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </div>
</template>
