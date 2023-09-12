<script setup lang="ts">
import FormGenerator from "../components/FormGenerator.vue";
import { FormField } from "../types/form";
import { ref } from "vue";

const data = ref();

const request = (d) => {
  data.value = d;
  return Promise.reject({
    paramErrors: {
      wheels: {
        0: { type: ["wheel 1 error"] },
        2: { type: ["wheel 3 error"] },
      },
      power: ["power required"],
    },
    title: "Request Error",
  });
};

const fields: FormField[] = [
  {
    name: "power",
    label: "Power",
    type: "number",
    required: true,
  },
  {
    name: "wheels",
    type: "array",
    fields: [
      {
        name: "type",
        label: "Type",
        type: "text",
        required: true,
      },
      {
        name: "size",
        label: "Size",
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
  <div class="p-20">
    <div>
      <FormGenerator :fields="fields" :request="request" />
    </div>
    <div>data: {{ data }}</div>
  </div>
</template>
