<script setup lang="ts">
import PaginationButtons from "./PaginationButtons.vue";
import PaginationInfo from "./PaginationInfo.vue";
import PaginationObjects from "./PaginationObjects.vue";
import PaginationPerPage from "./PaginationPerPage.vue";

defineProps<{
  page: number;
  totalPages: number;
  prev: () => void;
  next: () => void;
  // eslint-disable-next-line no-unused-vars
  setPerPage: (value: number) => void;
  // eslint-disable-next-line no-unused-vars
  changePage: (value: number) => void;
  perPage: number;
  limit: number;
  offset: number;
  total?: number;
}>();
</script>

<template>
  <div class="flex items-center mt-4 space-x-5">
    <PaginationButtons
      :prev="prev"
      :next="next"
      :page="page"
      :change-page="changePage"
      :total-pages="totalPages"
    />
    <PaginationInfo :page="page" :total-pages="totalPages" />
    <PaginationPerPage :set-per-page="setPerPage" :per-page="perPage" />
    <PaginationObjects :limit="limit" :offset="offset" :total="total" />
  </div>
</template>
