<template>
  <VCard class="payout-packages-tab">
    <VRow>
      <VCol cols="12">
        <VCardItem>
          <VForm @submit.prevent="checkData">
            <!-- main settings -->
            <VCardTitle class="mb-5">
              {{ $t('company_profile.payout_settings') }}
            </VCardTitle>

            <!-- Monthly Transactions Limit -->
            <AppTextField
              v-model="salaryAdvanceLimit"
              :rules="[requiredValidator]"
              :label="$t('company_profile.month_transaction_limit')"
              required
              class="pa-2"
              @keypress="useNumbersInput($event)"
            />

            <!-- Monthly Subscription Amount -->
            <AppTextField
              v-model="maxInstallment"
              :rules="[requiredValidator]"
              :label="$t('company_profile.month_Subscription_Amount')"
              required
              class="pa-2"
              @keypress="useNumbersInput($event)"
            />

            <!-- Monthly Transactions Limit -->
            <AppSelect
              v-model="select"
              class="pa-2"
              :items="items"
              :rules="[requiredValidator]"
              :label="$t('company_profile.same_day_hr_max_hour')"
              name="select"
              require
            />

            <VDivider class="mt-5" />
            <!-- Services Settings -->
            <VCardTitle class="my-5">
              {{ $t('company_profile.payout_packages') }}
            </VCardTitle>
            <AppSelect
              v-model="select"
              class="pa-2"
              :items="items"
              :rules="[requiredValidator]"
              :label="$t('company_profile.same_day_transaction')"
              name="select"
              require
            />
            <AppSelect
              v-model="select"
              class="pa-2"
              :items="items"
              :rules="[requiredValidator]"
              :label="$t('company_profile.next_day_transaction')"
              name="select"
              require
            />
            <AppSelect
              v-model="select"
              class="pa-2"
              :items="items"
              :rules="[requiredValidator]"
              :label="$t('company_profile.after_2_day_transaction')"
              name="select"
              require
            />
            <VDivider class="mt-5" />
            <VCardItem class="package-table">
              <VCardTitle class="mb-5">
                {{ $t('company_profile.payout_packages') }}
              </VCardTitle>
              <VTable class="text-no-wrap">
                <thead>
                  <tr>
                    <th class="text-uppercase">
                      {{ $t('general.package') }}
                    </th>
                    <th class="text-uppercase">
                      {{ $t('company_profile.payment_group') }}
                    </th>
                    <th class="text-uppercase">
                      {{ $t('company_profile.tb_actions') }}
                    </th>
                  </tr>
                </thead>

                <tbody v-if="payoutPackages.length > 0">
                  <tr
                    v-for="(payout,i) in payoutPackages"
                    :key="i"
                  >
                    <td>{{ payout.type }}</td>
                    <td>{{ payout.group }}</td>
                    <td>
                      <VBtn
                        size="38"
                        variant="plain"
                      >
                        <VIcon
                          icon="tabler-edit"
                          color="primary"
                          size="22"
                        />
                      </VBtn>
                      <VBtn
                        size="38"
                        variant="text"
                        color="error"
                      >
                        <VIcon
                          icon="tabler-trash"
                          color="error"
                          size="22"
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
              <VCardActions class="add-package">
                <VBtn
                  color="white"
                  size="small"
                  class="bg-primary"
                >
                  <VIcon icon="tabler-plus" />
                  {{ $t('general.add_package') }}
                </VBtn>
              </VCardActions>
            </VCardItem>

            <VDivider class="my-5" />

            <VCardActions class="update-payout-packages-form">
              <VBtn
                color="white"
                class="bg-primary"
                block
              >
                {{ $t('company_profile.update_payout_package') }}
              </VBtn>
            </VCardActions>
          </VForm>
        </VCardItem>
      </VCol>
    </VRow> 
  </VCard>
</template>

<script setup>
import { ref } from 'vue'
import {
  requiredValidator,
} from '@validators'
import { useNumbersInput } from '@/composable/useNumberInput'


/* reactive data */
const select = ref()
const maxInstallment = ref()
const salaryAdvanceLimit = ref()



/* constant variavle */
const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
]

const payoutPackages = ref([])

/* methods */
const checkData = () => {
  console.log('done')
}
</script>

<style lang="scss">
.payout-packages-tab {
  position: relative;
  overflow: hidden;

  .package-table {
    position: relative;
    overflow: hidden;

    .add-package {
      position: absolute;
      inset-block-start: 18px;
      inset-inline-end: 0;
    }
  }
}
</style>
