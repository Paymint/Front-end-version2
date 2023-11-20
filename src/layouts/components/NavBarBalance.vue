<script setup>
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { useNmberWithCommas } from '../../composable/useNumberWithCommas'

const { numberWithCommas } = useNmberWithCommas()

const { appContentLayoutNav } = useThemeConfig()
</script>

<template>
  <div
    v-if="appContentLayoutNav === 'vertical'"
    class="d-flex align-center "
  >
    <!-- outstanding Balance -->
    <div class="d-flex align-center flex-column justify-center pa-2">
      <span>{{ $t('balance.company.outstanding') }}</span>
      <span>{{ numberWithCommas(50000.505050,$t('company_dashboard.egp')) }}</span>
    </div>
    <div class="d-flex align-center flex-column justify-center pa-2">
      <span>{{ $t('balance.company.actual_balance') }}</span>
      <span>{{ numberWithCommas(50000.505050,$t('company_dashboard.egp')) }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@styles/variables/_vuetify.scss";

.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
