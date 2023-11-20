<template>
  <VCard class="payment-groups-tab">
    <VRow>
      <VCol cols="12">
        <VCardText>{{ $t('company_profile.payment_groups') }}</VCardText>
      </VCol> 
    </VRow>   

    <VCardItem>
      <VForm>
        <VRow>
          <VCol sm="6">
            <AppTextField
              placeholder="Payment Group Name"
              persistent-placeholder
            />
          </VCol>
          <VCol
            sm="6"
            class=" add-payment-group"
          >
            <VBtn
              color="white"
              size="small"
              class="bg-primary"
            >
              <VIcon icon="tabler-plus" />
              {{ $t('company_profile.add_payment_group') }}
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardItem>
    <VRow>
      <VCol cols="12">
        <VCardItem>
          <VTable class="text-no-wrap">
            <thead>
              <tr>
                <th class="text-uppercase">
                  {{ $t('company_profile.tb_name') }}
                </th>
                <th class="text-uppercase text-center">
                  {{ $t('company_profile.tb_actions') }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(Payment,i) in PaymentGroups"
                :key="i"
              >
                <td>
                  {{ Payment.name }}
                </td>

                <td class="text-center">
                  <VBtn
                    size="22"
                    variant="plain"
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
          </VTable>
        </VCardItem>
      </VCol>
    </VRow>
  </VCard>
</template>

<script setup>
const PaymentGroups = [
  {
    name: 'Frozen Yogurt',
  },
  {
    name: 'Frozen Yogurt',
  },
]
</script>

<style lang="scss">
.payment-groups-tab {
  position: relative;
  overflow: hidden;

  .add-payment-group {
    text-align: end;
  }
}
</style>
