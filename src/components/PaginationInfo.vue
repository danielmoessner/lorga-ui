<template>
  <div id="pagination-bar-info" class="">
    <div class="inline-flex -space-x-px rounded-md shadow-sm h-9 isolate">
      <div
        class="relative inline-flex items-center px-2 py-2 text-sm bg-white rounded-md text-slate-600 ring-1 ring-inset ring-gray-100 focus:z-20 focus:outline-offset-0"
      >
        Showing page {{ page }} of {{ totalPages }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  page: number;
  totalPages: number;
}>();
</script>
