<template>
  <div class="payment-methods-page">
    <!-- page header -->
    <VRow>
      <VCol cols="12 d-flex justify-space-between">
        <PageHeader
          :items="items"
          :title="title"
        />
      </VCol>
    </VRow>
  </div>
</template>  

<script setup>
import PageHeader from "@/components/page-header.vue"
import { useI18n } from "vue-i18n"
import { ref } from "vue"

const { t } = useI18n()

const title = ref(`${t('menuitems.settings.list.payment_methods')}`)

const items = reactive([
  {
    title: 'Dashboard',
    disabled: false,
    href: 'dashboard',
  },
  {
    title: `${t('menuitems.settings.list.payment_methods')}`,
    disabled: true,
  },
])
</script>
