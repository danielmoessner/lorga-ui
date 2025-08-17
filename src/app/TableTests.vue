<template>
  <div class="w-full min-h-screen p-10 bg-gray-100">
    <div class="">
      <TableGenerator :head="head" :data="data">
        <template #head-action>
          <div>
            <button class="text-sm text-white bg-gray-900">abcdefgh</button>
          </div>
          <div>
            <button class="text-sm text-white bg-gray-900">abcdefgh</button>
          </div>
        </template>
        <template #action>
          <button class="text-white bg-gray-900">test</button>
          <button class="text-white bg-gray-900">test</button>
        </template>
        <template #name="{ v }">
          {{ v }}
        </template>
      </TableGenerator>
    </div>
  </div>
</template>

<script setup lang="ts">
// import TableSortable from "../components/TableSortable.vue";
import TableGenerator from "../components/TableGenerator.vue";

const head = [
  {
    name: "Dessert (100g serving)",
    // sortable: false,
    key: "name",
  },
  { name: "Calories", key: "calories", sortable: true },
  { name: "Fat (g)", key: "fat", sortable: true },
  { name: "Carbs (g)", key: "carbs", sortable: true },
  { name: "Protein (g)", key: "protein", sortable: true },
  { name: "Iron (%)", key: "iron", sortable: true },
  { name: "Action", key: "action", sortable: false },
];

const data = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: "6%",
  },
];
</script>
