<template>
  <h5 class="pt-3 flex-fill text-black">
    {{ title.toUpperCase() }}
  </h5>
  <div
    class="d-flex"
    :class="props.class"
  >
    <slot />
    <VBreadcrumbs 
      :items="props.items" 
      divider="/"
    >
      <template #title="{ item }">
        <span style="font-size: 14px;">
          {{ item.title }}
        </span>
      </template>
    </VBreadcrumbs>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
  },
  class: {
    type: String,
    default: null,
  },
})
</script>

<style>
.v-breadcrumbs--density-default {
  padding-block-start: 10px !important;
}
</style>

