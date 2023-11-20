<template>
  <VCard>
    <VForm>
      <template
        v-for="input in props.inputs"
        :key="input.id"
      >
        <VComponent
          v-model="input.value"
          :component="input.component"
          :label="input.label"
          :type="input.type"
        />
      </template>
    </VForm>
  </VCard>
</template>

<script setup>
const props = defineProps({
  inputs: {
    type: Array,
    required: true,
  },
})
</script>
