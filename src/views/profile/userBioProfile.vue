<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol 
      v-if="userData" 
      cols="12"
    >
      <VCard class="company-bio">
        <VCardText class="text-center d-flex justify-center">
          <!-- 👉 Avatar -->
          <div
            class="img-src"
            style="overflow: hidden;width: 100px;"
          >
            <VImg
              style="width: 110px; border-radius: 50%;"
              :src="userData.personal_image"
            />
          </div>
        </VCardText>
        <VDivider />

      
        <!-- 👉 Person Data -->
        <VCardText class="pt-3">
          <p class="text-sm text-uppercase d-flex">
            <VIcon
              :size="20"
              icon="tabler-user"
              color="primary"
            />
            <span class="text-black">
              {{ $t('company_profile.details') }}
            </span>
          </p>

          <!-- 👉 User Details list -->
          <VList class="card-list mt-5">
            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('company_profile.name') }}
                  <span class="text-body-2">
                    {{ userData.role.name }}
                  </span>
                </p>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('company_profile.phone') }}
                  <span class="text-body-2">{{ userData.phone_number }}</span>
                </p>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('general.email') }}:

                  <span class="text-capitalize text-body-2">
                    {{ userData.email }}
                  </span>
                </p>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <p class="text-subtitle-2 text-black">
                  {{ $t('general.user_name') }}:

                  <span class="text-capitalize text-body-2">
                    {{ userData.user_name }}
                  </span>
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
            @click="editData"
          >
            {{ $t('general.edit_data') }}
          </VBtn>
        </VCardText>
      </VCard>
      <EditDataDialog 
        v-model:is-dialog-visible="isDialogVisible"
        :user-data="userData"
      />
    </VCol>
  </VRow>
</template>

<script setup>
import { userDataStore } from '@/store/useGetUserData'
import { useUserProfileStore } from '@/views/profile/useUserProfileStore'
import { onMounted, ref } from 'vue'

import EditDataDialog from "./tabs/EditUserDialog.vue"

const userStore = userDataStore()

const userProfileStore = useUserProfileStore()
const userData = ref(null)
const isDialogVisible = ref(false)

const editData = () => {
  isDialogVisible.value = true
}

const getUserData = async () => {

  try {
    const response = await userProfileStore.fetchUserProfile()
    if(response.status){
      userData.value = response.data
    }

  } catch (e) { 
    console.log(e)
  }
}

onMounted(() => {
  getUserData()
  userStore.getData()
})
</script>

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
