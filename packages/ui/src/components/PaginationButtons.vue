<template>
  <div class="">
    <nav
      class="inline-flex -space-x-px rounded-md shadow-sm h-9 isolate"
      aria-label="Pagination"
    >
      <button
        id="pagination-bar-prev"
        type="button"
        class="relative inline-flex items-center px-2 py-2 bg-white text-slate-600 rounded-l-md ring-1 ring-inset ring-gray-100 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        @click="prev"
      >
        <span class="sr-only">Previous</span>
        <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
      </button>

      <label for="pagination-bar-which-page" class="sr-only">Page</label>
      <select
        v-if="totalPages"
        id="pagination-bar-which-page"
        v-model="model"
        name="perPage"
        class="block w-full px-2 text-center appearance-none bg-white text-slate-500 focus:outline-none focus:ring-0"
      >
        <option v-for="p in pages" :key="p" :value="p">{{ p }}</option>
      </select>

      <button
        id="pagination-bar-next"
        type="button"
        class="relative inline-flex items-center px-2 py-2 bg-white text-slate-600 rounded-r-md ring-1 ring-inset ring-gray-100 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        @click="next"
      >
        <span class="sr-only">Next</span>
        <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
import { computed } from "vue";

const props = defineProps<{
  prev: () => void;
  next: () => void;
  totalPages: number;
  page: number;
  // eslint-disable-next-line no-unused-vars
  changePage: (value: number) => void;
}>();

const model = computed({
  get: () => {
    return props.page;
  },
  set: (newValue) => {
    props.changePage(newValue);
  },
});

const pages = computed(() => {
  if (!props.totalPages) return [];
  const p: number[] = [];
  for (let i = 1; i <= props.totalPages; i++) {
    p.push(i);
  }
  return p;
});
</script>
