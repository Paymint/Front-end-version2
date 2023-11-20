<template>
  <VCard class="branches-tab">
    <VRow>
      <VCol cols="12">
        <VCardText>{{ $t('company_profile.com_branches') }}</VCardText>
        <VCardItem>
          <VTable class="text-no-wrap">
            <thead>
              <tr>
                <th class="text-uppercase">
                  {{ $t('company_profile.tb_name') }}
                </th>
                <th class="text-uppercase text-center">
                  {{ $t('company_profile.tb_city') }}
                </th>
                <th class="text-uppercase text-center">
                  {{ $t('company_profile.tb_address') }}
                </th>
                <th class="text-uppercase text-center">
                  {{ $t('company_profile.tb_actions') }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(branch,index) in Branches"
                :key="index"
              >
                <td>
                  {{ branch.name }}
                </td>
                <td class="text-center">
                  {{ branch.city }}
                </td>
                <td class="text-center">
                  {{ branch.address }}
                </td>
                <td class="text-center">
                  <VBtn size="38">
                    <VIcon
                      icon="tabler-edit"
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
    <VCardActions class="add-branch">
      <VBtn
        color="white"
        size="small"
        class="bg-primary"
      >
        <VIcon icon="tabler-plus" />
        {{ $t('company_profile.add_new_branch') }}
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup>
const Branches = [
  {
    name: 'Frozen Yogurt',
    city: 'Cairo',
    address: '11-كورنيش - كوبري شمال طره- المعادي',
  },
  {
    name: 'Frozen Yogurt',
    city: 'Cairo',
    address: '11-كورنيش - كوبري شمال طره- المعادي',
  },
]
</script>

<style lang="scss">
.branches-tab {
  position: relative;
  overflow: hidden;

  .add-branch {
    position: absolute;
    inset-block-start: 21px;
    inset-inline-end: 5px;
  }
}
</style>
