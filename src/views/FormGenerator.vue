<script setup lang="ts">
import FormGenerator from "../components/FormGenerator.vue";
import { FormField } from "../types/form";

const request = () =>
  Promise.reject({
    paramErrors: { test01: ["Error"], nested: { test11: ["Another Error"] } },
    title: "TITLE",
  });

const fields: FormField[] = [
  {
    name: "test01",
    label: "Test 01",
    type: "text",
    required: true,
  },
  {
    name: "test02",
    label: "Test 02",
    type: "text",
    required: true,
  },
  {
    name: "nested",
    type: "fields",
    fields: [
      {
        name: "test11",
        label: "Test 11",
        type: "text",
        required: true,
      },
      {
        name: "test12",
        label: "Test 12",
        type: "searchselect",
        required: true,
        options: [
          { id: "1", name: "One" },
          { id: "2", name: "Two" },
        ],
      },
    ],
  },
];
</script>

<template>
  <div class="max-w-xl p-20">
    <FormGenerator
      :fields="fields"
      :request="request"
      :data="{ nested: { test12: '1' } }"
    />
  </div>
</template>
