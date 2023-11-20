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
      <VCol 
        cols="12" 
        sm="5" 
        lg="4"
      >
        <UserBioProfile />
      </VCol>

      <VCol 
        cols="12" 
        sm="7" 
        lg="8"
      >
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
            <ChangePassword />
          </VWindowItem>
          <VWindowItem>
            <ChangePin />
          </VWindowItem>
        </VWindow>
      </VCol>
    </VRow>
  </div>
</template>

<script setup>
import UserBioProfile from "@/views/profile/userBioProfile.vue"
import { useI18n } from "vue-i18n"
import ChangePin from '@/views/profile/tabs/changePin.vue'
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
    icon: 'tabler-key',
    title: 'Change Password',
  },
  {
    icon: 'tabler-password-user',
    title: 'Change Pin',
  },
]

const profileTab = ref(null)
</script>
