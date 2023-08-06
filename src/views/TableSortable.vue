<script setup lang="ts">
import TableSortable from "../components/TableSortable.vue";
const data = [
  { a: 1, b: 4 },
  { a: 2, b: 3 },
];

const head = [
  { name: "A", key: "a", sortable: true },
  { name: "B", key: "b", sortable: true },
];

const getDisplayValueFunc = (item, key) =>
  `displayValue ${key} ${item[key] * -1}`;

const getValueFunc = (item, key) => item[key];
</script>

<template>
  <div class="p-5 bg-gray-500">
    <TableSortable
      :data="data"
      :head="head"
      :get-value-func="getValueFunc"
      :get-display-value-func="getDisplayValueFunc"
    />
  </div>
</template>
