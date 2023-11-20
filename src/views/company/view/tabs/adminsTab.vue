<template>
  <VCard class="admins-tab">
    <VRow>
      <VCol cols="12">
        <VCardText>{{ $t('company_profile.com_admins') }}</VCardText>
        <VCardItem>
          <VTable class="text-no-wrap">
            <thead>
              <tr>
                <th class="text-uppercase">
                  {{ $t('company_profile.tb_name') }}
                </th>
                <th class="text-uppercase text-center">
                  {{ $t('general.email') }}
                </th>
                <th class="text-uppercase text-center">
                  {{ $t('general.branch') }}
                </th>
                <th class="text-uppercase text-center">
                  {{ $t('general.role') }}
                </th>
                <th class="text-uppercase text-center">
                  {{ $t('company_profile.tb_actions') }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(admin,index) in admins"
                :key="index"
              >
                <td>
                  {{ admin.name }}
                </td>
                <td class="text-center">
                  {{ admin.email }}
                </td>
                <td class="text-center">
                  {{ admin.branch }}
                </td>
                <td class="text-center">
                  {{ admin.role }}
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
    <VCardActions class="add-admin">
      <VBtn
        color="white"
        size="small"
        class="bg-primary"
      >
        <VIcon icon="tabler-plus" />
        {{ $t('company_profile.add_new_admin') }}
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup>
const admins = [
  {
    name: 'Frozen Yogurt',
    email: 'shehab.muhammed99@gmail.com',
    branch: 'Head quarter',
    role: 'Admin',
  },
  {
    name: 'Frozen Yogurt',
    email: 'shehab.muhammed99@gmail.com',
    branch: 'Head quarter',
    role: 'Admin',
  },
  {
    name: 'Frozen Yogurt',
    email: 'shehab.muhammed99@gmail.com',
    branch: 'Head quarter',
    role: 'Admin',
  },
]
</script>

<style lang="scss">
.admins-tab {
  position: relative;
  overflow: hidden;

  .add-admin {
    position: absolute;
    inset-block-start: 21px;
    inset-inline-end: 5px;
  }
}
</style>
