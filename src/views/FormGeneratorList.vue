<script setup lang="ts">
import { ref } from "vue";
import FormGenerator from "../components/FormGenerator.vue";
import { FormField } from "../types/form";
import FormList from "../components/FormList.vue";

const requestData = ref();

const request = (data) => {
  requestData.value = undefined;
  requestData.value = data;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({
        paramErrors: {
          test01: { 1: ["Error"] },
          //   test01: ["Error"],
        },
        title: "TITLE",
      });
    }, 1000); // delay in milliseconds
  });
  //   return Promise.resolve();
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
  <div>
    <FormList
      label="Test 01"
      name="test01"
      :model-value="['Custom Value 1', 'Another Value 2']"
      :get-error="
        (index: (string | number)[]) =>
          index[0] === 1 ? ['error on value 2'] : []
      "
    />
  </div>
</template>
