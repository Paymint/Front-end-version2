<template>
  <VCard class="documents-tab">
    <VRow>
      <VCol cols="12">
        <VCardText>{{ $t('company_profile.company_documents') }}</VCardText>
        <VCardItem>
          <VTable class="text-no-wrap">
            <tbody>
              <tr>
                <td>
                  {{ $t('general.crn_title') }}
                </td>
                <td class="text-center">
                  <a href="">
                    <VIcon
                      icon="tabler-download"
                      size="24"
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  {{ $t('company_profile.tax_id_title') }}
                </td>
                <td class="text-center">
                  <a href="">
                    <VIcon
                      icon="tabler-download"
                      size="24"
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  {{ $t('company_profile.auth_letter') }}
                </td>
                <td class="text-center">
                  <a href="">
                    <VIcon
                      icon="tabler-download"
                      size="24"
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  {{ $t('company_profile.contract') }}
                </td>
                <td class="text-center">
                  <a href="">
                    <VIcon
                      icon="tabler-download"
                      size="24"
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  {{ $t('company_profile.hq_ownership_contract') }}
                </td>
                <td class="text-center">
                  <a href="">
                    <VIcon
                      icon="tabler-download"
                      size="24"
                    />
                  </a>
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCardItem>
      </VCol>
    </VRow> 
    <VCardActions class="edit-data">
      <VBtn
        color="white"
        size="small"
        class="bg-primary"
      >
        <VIcon icon="tabler-edit" />
        <span class="pa-2">
          {{ $t('general.edit_data') }}
        </span>
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<style lang="scss">
.documents-tab {
  position: relative;
  overflow: hidden;

  .edit-data {
    position: absolute;
    inset-block-start: 21px;
    inset-inline-end: 5px;
  }
}
</style>
