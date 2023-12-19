<template>
  <div class="user-profile">
    <VRow>
      <VCol cols="12 d-flex justify-space-between ">
        <PageHeader 
          :items="items" 
          :title="title" 
        />
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12">
        <VTabs 
          v-model="profileTab" 
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
            <span style="font-size: 14px">{{ tab.title }}</span>
          </VTab>
        </VTabs>

        <VWindow
          v-model="profileTab"
          class="mt-6 disable-tab-transition"
          :touch="false"
        >
          <VWindowItem>
            <UserBioProfile />
          </VWindowItem>
          <VWindowItem>
            <ChangePassword />
          </VWindowItem>
        </VWindow>
      </VCol>
    </VRow>
  </div>
</template>

<script setup>
import UserBioProfile from "@/views/profile/tabs/userBioProfile.vue"
import { useI18n } from "vue-i18n"
import ChangePassword from '@/views/profile/tabs/changePassword.vue'

const { t } = useI18n()

const title = `${t("general.my_profile")}`

const items = [
  {
    title: "Dashboard",
    disabled: false,
    href: "dashboard",
  },
  {
    title: `${t("general.my_profile")}`,
    disabled: true,
  },
]

const tabs = [
  {
    icon: 'tabler-users',
    title: 'Account',
  },
  {
    icon: 'tabler-lock',
    title: 'Security',
  },
]

const profileTab = ref(null)
</script>
