<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  // eslint-disable-next-line no-unused-vars
  setPerPage: (value: number) => void;
  perPage: number;
}>();

const modelValue = computed({
  get: () => props.perPage.toString(),
  set: (value) => props.setPerPage(parseInt(value)),
});
</script>

<template>
  <div class="inline-flex -space-x-px rounded-md shadow-sm h-9 isolate">
    <div
      class="relative inline-flex items-center px-2 py-2 text-sm bg-white rounded-md text-slate-600 ring-1 ring-inset ring-gray-100 focus:z-20 focus:outline-offset-0"
    >
      <label
        for="pagination-bar-per-page"
        class="inline-block mr-2 whitespace-nowrap"
      >
        Per page
      </label>
      <select
        id="pagination-bar-per-page"
        v-model="modelValue"
        name="perPage"
        class="block w-full pl-5 pr-2 border rounded-md border-gray-200 text-slate-900 focus:outline-none focus:ring-0"
      >
        <option>10</option>
        <option>20</option>
        <option>50</option>
        <option>100</option>
      </select>
    </div>
  </div>
</template>
