<template>
  <div class="w-full min-h-screen p-10 bg-gray-100">
    <div class="max-w-lg">
      <FormSelect label="Test" required :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FormSelect from "../components/FormSelect.vue";

const options = ["Option 1", "Option 2", "Option 3"];
</script>
