<script setup lang="ts">
import FormSelect from "@/components/FormSelect.vue";
import { ref } from "vue";

const year = ref("");

const years = [
  { name: "Year: All", value: "" },
  { name: "Year: 2021", value: "2021" },
  { name: "Year: 2022", value: "2022" },
  { name: "Year: 2023", value: "2023" },
  { name: "Year: 2024", value: "2024" },
  { name: "Year: 2025", value: "2025" },
];
</script>

<template>
  <div class="max-w-2xl p-64 bg-gray-200">
    <FormSelect v-model="year" :options="years" label="" required />
    {{ year }}
  </div>
</template>
