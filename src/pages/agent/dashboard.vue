<script setup>
import { ref } from "vue"

const text = ref("Hello From Agent Dashboard")
</script>

<template>
  <div class="agent-dashboard">
    <h3>
      {{ text }}
    </h3>
  </div>
</template>
