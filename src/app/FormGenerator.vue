<script setup lang="ts">
import { ref } from "vue";
import FormGenerator from "../components/FormGenerator.vue";
import { FormField } from "../types/form";

const requestData = ref();

const request = (data) => {
  // requestData.value = undefined;
  requestData.value = data;
  // Promise.reject({
  //   paramErrors: {
  //     test01: ["Error"],
  //     nested: {
  //       test11: ["Another Error"],
  //       test13: ["Error"],
  //       test14: ["Error"],
  //     },
  //   },
  //   title: "TITLE",
  // });
  return Promise.resolve({ request: "success" });
};

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
    name: "Select",
    label: "Select",
    type: "select",
    required: true,
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
    ],
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
      {
        name: "test13",
        label: "Test 13",
        type: "toggle",
        required: true,
      },
      {
        name: "test14",
        label: "Test 14",
        type: "toggle",
        required: true,
      },
    ],
  },
];

const test = (data, data2) => {
  console.log(data, data2);
};
</script>

<template>
  <div class="max-w-xl p-20">
    <div>requestData: {{ requestData }}</div>
    <FormGenerator :fields="fields" :request="request" @success="test" />
  </div>
</template>
