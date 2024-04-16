<script setup lang="ts">
import PaginationBar from "@/components/PaginationBar.vue";
import { ref } from "vue";

const data = {
  total: 89,
};
const queryParams = ref({
  page: 1,
  limit: 10,
});
const setQueryParam = (key, value) => {
  queryParams.value[key] = value;
  return queryParams.value;
};
</script>

<template>
  <div class="p-10 bg-gray-900">
    <PaginationBar
      :total="data.total"
      :set-query-param="setQueryParam"
      :query-params="queryParams"
    />
  </div>
</template>
