<script setup lang="ts">
import { ref } from "vue";
import FormGenerator from "../components/FormGenerator.vue";
import { FormField } from "../types/form";

const requestData = ref();

const request = (data) => {
  requestData.value = undefined;
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
  return Promise.resolve();
};

const fields: FormField[] = [
  {
    label: "Test 01",
    name: "test01",
    type: "list",
    required: true,
  },
];
</script>

<template>
  <div class="max-w-xl p-20">
    <div>requestData: {{ requestData }}</div>
    <FormGenerator :fields="fields" :request="request" :data="{}" />
  </div>
</template>
