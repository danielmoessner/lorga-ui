<script setup lang="ts">
defineProps<{
  total?: number;
  limit: number;
  offset: number;
}>();
</script>

<template>
  <div class="">
    <div class="inline-flex -space-x-px rounded-md shadow-sm h-9 isolate">
      <div
        class="relative inline-flex items-center px-2 py-2 text-sm text-slate-600 bg-white rounded-md ring-1 ring-inset ring-gray-100 focus:z-20 focus:outline-offset-0"
      >
        Showing {{ offset + 1 }} to {{ limit }} of {{ total }} objects
      </div>
    </div>
  </div>
</template>
