<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"


/*********** Composables *****************/
const { t } = useI18n()


/*********** Dynamic Data *************/

const routersLinks = ref([
  {
    path: '/agent/users/add',
    icon: 'tabler-users',
    title: t('register_users'),
  },
  {
    path: '/agent/users/pending',
    icon: 'tabler-friends-off',
    title: t('pending_users'),
  },
  {
    path: '/agent/cards/link-card',
    icon: 'tabler-brand-mastercard',
    title: t('link_card'),
  },
  {
    path: '/agent/cards/active-card',
    icon: 'tabler-credit-card',
    title: t('active_card'),
  },
  {
    path: '/agent/cards/deactivate-card',
    icon: 'tabler-credit-card-off',
    title: t('deactivate_card'),
  },
  {
    path: '/agent/cards/close-card',
    icon: 'tabler-credit-card-off',
    title: t('close_card'),
  },
  {
    path: '/agent/branches/change-branch',
    icon: 'tabler-git-merge',
    title: t('change_branch'),
  },
])

/********** Static data *******************/
const title = t("dashboard_navbar_title")

const items = [
  {
    title: 'Dashboard',
    disabled: false,
    href: 'dashboard',
  },
]
</script>

<template>
  <div class="agent-dashboard">
    <VRow class="mb-5">
      <VCol cols="12 d-flex justify-space-between">
        <PageHeader 
          :items="items" 
          :title="title"
        />
      </VCol>
    </VRow>

    <VCard title="Short Links">
      <VCardItem>
        <div class="short-links">
          <RouterLink 
            v-for="(router, i) in routersLinks" 
            :key="i"
            :to="router.path"
            class="short-link"
          >
            <VIcon 
              :icon="router.icon" 
              class="short-link-icon"
              size="32"  
            />
            <span class="short-link-title">{{ router.title }}</span>
          </RouterLink>
        </div>  
      </VCardItem>
    </VCard>
  </div>
</template>
