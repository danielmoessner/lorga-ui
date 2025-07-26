<script setup lang="ts">
import { computed, ref } from "vue";
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
  {
    name: "test15",
    label: "Test 15",
    type: "select",
    required: true,
    options: [
      { id: "1", name: "One" },
      { id: "2", name: "Two" },
    ],
  },
];

const test = (data, data2) => {
  console.log(data, data2);
};

const selected = ref("3");
const text = ref("Test 01");
setTimeout(() => {
  selected.value = "1";
  text.value = "Test 01 Updated";
  console.log("selected set to 1");
}, 1000);

const initial = computed(() => ({
  test01: text.value,
  test12: "2",
  test15: selected.value,
}));
</script>

<template>
  <div class="max-w-xl p-20">
    <div>requestData: {{ requestData }}</div>
    <div>initial: {{ initial }}</div>
    <FormGenerator
      :fields="fields"
      :request="request"
      :data="initial"
      @success="test"
    />
  </div>
</template>
