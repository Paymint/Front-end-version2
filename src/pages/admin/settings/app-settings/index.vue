<template>
  <div class="app-settings-page">
    <!-- page header -->
    <VRow>
      <VCol cols="12 d-flex justify-space-between">
        <PageHeader 
          :items="items" 
          :title="title" 
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardItem>
            <VTabs 
              v-model="settingTab" 
              class="v-tabs-pill"
            >
              <VTab 
                v-for="tab in settingsTabs" 
                :key="tab.id"
              >
                <VIcon 
                  :size="18" 
                  :icon="tab.icon" 
                  class="me-1" 
                />
                <span style="font-size: 14px">{{ tab.title }}</span>
              </VTab>
            </VTabs>
          </VCardItem>
          <VCard>
            <VCardItem>
              <VWindow
                v-model="settingTab"
                class="mt-0 disable-tab-transition"
                :touch="false"
              >
                <VWindowItem>
                  <GeneralSettings />
                </VWindowItem>
                <VWindowItem>
                  <AppSettings />
                </VWindowItem>
                <VWindowItem>
                  <Holidays />
                </VWindowItem>
                <VWindowItem>
                  <NotificationMails />
                </VWindowItem>
                <VWindowItem>
                  <MonthlyGoals />
                </VWindowItem>
              </VWindow>
            </VCardItem>
          </VCard>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>  

<script setup>
import PageHeader from "@/components/page-header.vue"
import GeneralSettings from "@/views/settings/tabs/general-settings.vue"
import AppSettings from "@/views/settings/tabs/application-settings.vue"
import Holidays from "@/views/settings/tabs/holidays.vue"
import NotificationMails from "@/views/settings/tabs/notification-mails.vue"
import MonthlyGoals from "@/views/settings/tabs/monthly-goals.vue"

import { useI18n } from "vue-i18n"
import { ref } from "vue"

const { t } = useI18n()

const title = ref(`${t("menuitems.settings.text")}`)
const settingTab = ref(null)

const items = reactive([
  {
    title: "Dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: `${t("menuitems.settings.text")}`,
    disabled: true,
  },
])

const settingsTabs = [
  {
    id: 1,
    title: t('settings.general_settings'),
    icon: "tabler-settings",
  },
  {
    id: 2,
    title: t('settings.applications_settings'),
    icon: "tabler-device-mobile-cog",
  },
  {
    id: 3,
    title: t('settings.holidays'),
    icon: "tabler-world-cog",
  },
  {
    id: 4,
    title: t('settings.notification_emails'),
    icon: "tabler-mail-cog",
  },
  {
    id: 5,
    title: t('settings.monthly_goals'),
    icon: "tabler-coins",
  },
]
</script>
