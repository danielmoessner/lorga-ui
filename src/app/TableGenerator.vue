<script setup lang="ts">
import TableGenerator from "../components/TableGenerator.vue";

const data = [
  {
    name: "John",
    age: 25,
    city: "New York",
    long: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  },
  { name: "Jane", age: 24, city: "New York" },
  { name: "Joe", age: 28, city: "New York" },
];

const head = [
  { name: "Name", key: "name" },
  { name: "Age", key: "age" },
  { name: "City", key: "city" },
  { name: "Long", key: "long" },
  { name: "Action", key: "action" },
];
</script>

<template>
  <div class="p-10 bg-gray-800">
    <TableGenerator :data="data" :head="head">
      <template #long="{ i }">
        <span class="whitespace-nowrap">
          {{ i.long }}
        </span>
      </template>
      <template #action="{ i }">
        <button
          class="p-2 text-white bg-blue-500 rounded"
          @click="console.log(i)"
        >
          Edit
        </button>
      </template>
    </TableGenerator>
  </div>
</template>
