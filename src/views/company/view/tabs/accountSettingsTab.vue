<template>
  <VCard class="documents-tab">
    <VRow>
      <VCol cols="12">
        <VCardItem>
          <VForm @submit.prevent="checkData">
            <!-- main settings -->
            <VCardTitle class="mb-5">
              {{ $t('company_profile.main_settings') }}
            </VCardTitle>

            <!-- bank select -->
            <AppSelect
              v-model="select"
              :items="items"
              :rules="[requiredValidator]"
              :label="$t('company_profile.source_bank_name')"
              name="select"
              require
            />

            <!-- account status -->
            <div class="d-flex justify-space-between mt-5">
              <label class="v-label text-body-1 text-high-emphasis ">{{ $t('company_profile.account_status') }}</label>
              <VSwitch
                v-model="accountStatus"
                :inset="false"
                class="pa-3 ms-5"
              />
            </div>

            <VDivider />
            <!-- Services Settings -->
            <VCardTitle class="my-5">
              {{ $t('company_profile.services_settings') }}
            </VCardTitle>

            <div
              v-for="service in Services"
              :key="service.id"
              class="d-flex justify-space-between px-3"
            >
              <label class="v-label text-body-1 text-high-emphasis ">{{ service.name_en }}</label>
              <VSwitch
                v-model="service.status"
                :inset="false"
                class="py-1"
              />
            </div>

            <VDivider />
            <!-- Salary Advance Settings -->
            <VCardTitle class="my-5">
              {{ $t('company_profile.salary_advance_settings') }}
            </VCardTitle>

            <div class="d-flex justify-space-between mb-5 sa-settings">
              <!-- SA Limit -->
              <AppTextField
                v-model="salaryAdvanceLimit"
                :rules="[requiredValidator]"
                :label="$t('company_profile.salary_advance_com') + ' 50000'"
                required
                class="pa-2"
                @keypress="useNumbersInput($event)"
              />

              <!-- Max Number of Installment -->
              <AppTextField
                v-model="maxInstallment"
                :rules="[requiredValidator]"
                :label="$t('company_profile.com_max_num_instalments') + ' 3'"
                required
                class="pa-2"
                @keypress="useNumbersInput($event)"
              />
            </div>


            <VDivider class="mt-5" />

            <!-- Salary Advance Payment Groups Limits -->
            <div class="sa-groups-limit">
              <VCardTitle class="my-5">
                {{ $t('company_profile.sa_payment_groups_limits') }}
              </VCardTitle>

              <VTable class="text-no-wrap">
                <thead>
                  <tr>
                    <th class="text-uppercase">
                      {{ $t('company_profile.payment_group') }}
                    </th>
                    <th class="text-uppercase ">
                      {{ $t('company_profile.sa_limit') }}
                    </th>
                    <th class="text-uppercase">
                      {{ $t('company_profile.max_instalment') }}
                    </th>
                    <th class="text-uppercase ">
                      {{ $t('company_profile.tb_actions') }}
                    </th>
                  </tr>
                </thead>

                <tbody v-if="sa_payment_groups.length > 0">
                  <tr
                    v-for="(group,index) in sa_payment_groups"
                    :key="index"
                  >
                    <td>{{ group.name }}</td>
                    <td>{{ group.sa_limit }}</td>
                    <td>{{ group.max_num }}</td>
                    <td class="text-center">
                      <VBtn
                        size="38"
                        variant="plain"
                      >
                        <VIcon
                          icon="tabler-eye"
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
              <VCardActions class="add-new-limit">
                <VBtn
                  color="white"
                  size="small"
                  class="bg-primary"
                >
                  <VIcon icon="tabler-plus" />
                  {{ $t('company_profile.add_new_limit') }}
                </VBtn>
              </VCardActions>
            </div>

            <VDivider class="my-5" />
            <!-- update form -->
            <VCardActions class="update-account-settings-form">
              <VBtn
                color="white"
                class="bg-primary"
                block
              >
                {{ $t('company_profile.update_account') }}
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
const accountStatus = ref()
const maxInstallment = ref()
const salaryAdvanceLimit = ref()



/* constant variavle */
const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
]

const Services = ref([
  { id: 1, name_en: 'One Time Payment', status: false },
  { id: 2, name_en: 'Bills Payment Service', status: false },
  { id: 3, name_en: 'Loans Service', status: false },
  { id: 4, name_en: 'Salary Advance Service', status: false },
  { id: 5, name_en: 'Payout Service', status: false },

])

const sa_payment_groups = ref([])

/* methods */
const checkData = () => {
  console.log('done')
}
</script>

<style lang="scss">
.documents-tab {
  position: relative;
  overflow: hidden;

  .sa-settings {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media (max-width: 992px) {
      flex-direction: column;
    }
  }

  .sa-groups-limit {
    position: relative;
    overflow: hidden;

    .add-new-limit {
      position: absolute;
      inset-block-start: 18px;
      inset-inline-end: 0;
    }
  }
}
</style>
