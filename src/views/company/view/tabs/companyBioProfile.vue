<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard class="company-bio">
        <VCardText class="text-center d-flex">
          <!-- 👉 Avatar -->
          <div
            class="img-src flex-fill"
            style="overflow: hidden;width: 100px;"
          >
            <VImg
              style="width: 110px; border-radius: 50%;"
              src="https://api.paymint-eg.com/storage/14572/169089342191407.jpg"
            />
          </div>

          <!-- 👉 company name -->
          <div class="flex-fill d-flex flex-column justify-center">
            <h4>
              English Company Name
            </h4>
            <h4>
              Arabic Company Name
            </h4>
          </div>
        </VCardText>
        <VDivider />

        <!-- 👉  Business Data -->
        <VCardText class="pt-3">
          <p class="text-sm text-uppercase d-flex">
            <VIcon
              :size="20"
              icon="tabler-map-pin-filled"
              color="primary"
            />
            <span class="text-black">
              {{ $t('general.business_data') }}
            </span>
          </p>

          <!-- 👉 User Details list -->
          <VList class="card-list mt-5">
            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('company_profile.website') }}
                  <span class="text-body-2">
                    http://localhost:3030/
                  </span>
                </p>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('company_profile.ref_num') }}
                  <span class="text-body-2">567916</span>
                </p>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('company_profile.phone') }}

                  <span class="text-capitalize text-body-2">
                    01009768717
                  </span>
                </p>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('company_profile.business_field') }}
                  <span class="text-capitalize text-body-2">Admin</span>
                </p>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('company_profile.com_bank_name') }}
                  <span class="text-body-2">
                    Bank Misr
                  </span>
                </p>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('company_profile.bank_account_num') }}
                  <span class="text-body-2">100046439427</span>
                </p>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('company_profile.crn') }}
                  <span class="text-body-2">123456</span>
                </p>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('company_profile.tax_id') }}
                  <span class="text-body-2">29901302201478</span>
                </p>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>
      
        <VDivider />
        <!-- 👉   Contact Person -->
        <VCardText class="pt-3">
          <p class="text-sm text-uppercase d-flex">
            <VIcon
              :size="20"
              icon="tabler-user"
              color="primary"
            />
            <span class="text-black">
              {{ $t('company_profile.contact_person') }}
            </span>
          </p>

          <!-- 👉 User Details list -->
          <VList class="card-list mt-5">
            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('company_profile.name') }}
                  <span class="text-body-2">
                    http://localhost:3030/
                  </span>
                </p>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('company_profile.phone') }}
                  <span class="text-body-2">567916</span>
                </p>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('general.email') }}:

                  <span class="text-capitalize text-body-2">
                    01009768717
                  </span>
                </p>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <VDivider />
        <!-- 👉   Sales Agent -->
        <VCardText class="pt-3">
          <p class="text-sm text-uppercase d-flex">
            <VIcon
              :size="20"
              icon="tabler-user"
              color="primary"
            />
            <span class="text-black">
              {{ $t('company_profile.sales_agent') }}
            </span>
          </p>

          <!-- 👉 User Details list -->
          <VList class="card-list mt-5">
            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('company_profile.agent_name') }}
                  <VChip color="primary">
                    Shehab Muhammed
                  </VChip>
                </p>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit  -->
        <VCardText class="d-flex mt-5">
          <VBtn
            variant="elevated"
            class="edit-data"
            size="small"
          >
            {{ $t('general.edit_data') }}
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}

p {
  margin-block-end: 0;
}

.company-bio {
  position: relative;
  overflow: hidden;

  .edit-data {
    position: absolute;
    inset-block-end: 10px;
    inset-inline-end: 10px;
  }
}
</style>
