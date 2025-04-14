<script setup lang="ts">
import { computed } from "vue";

const { text } = defineProps<{ text: string }>();

const computedText = computed<string>(() => {
  return `${text} - computed`;
});
</script>

<template>
  <div>
    <h1>Props Destructure Child</h1>
    <p>{{ text }}</p>
    <p>{{ computedText }}</p>
  </div>
</template>
