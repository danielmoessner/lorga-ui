<template>
  <p v-if="helptext" class="mt-1 text-sm text-gray-500">
    {{ helptext }}
  </p>
</template>

<script lang="ts" setup>
defineProps<{ helptext?: string }>();
</script>
