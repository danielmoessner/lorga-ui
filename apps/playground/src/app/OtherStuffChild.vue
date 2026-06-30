<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps<{
  number: number;
}>();
const { number } = toRefs(props);
</script>

<template>
  <div>OtherStuffChild: {{ number }}</div>
</template>
