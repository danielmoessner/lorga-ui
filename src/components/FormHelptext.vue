<template>
  <p v-if="helptext" class="mt-1 text-sm text-gray-500 whitespace-pre-line">
    {{ helptext }}
  </p>
</template>

<script lang="ts" setup>
defineProps<{ helptext?: string }>();
</script>
