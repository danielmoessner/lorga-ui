<template>
  <div class="m-20 bg-gray-50">
    <FormCheckbox
      v-model="model"
      label="Accept Legal Requirements"
      :options="options"
      name="accept_legal_requirements"
      required
    />
  </div>
  model:{{ model }}
</template>

<script lang="ts" setup>
import FormCheckbox from "../components/FormCheckbox.vue";
import { ref } from "vue";

const model = ref();

const options = [
  {
    name: "Datenschutz",
    required: true,
    id: 234,
  },
  {
    name: "Datenschutz 2",
    required: false,
    id: 2334,
  },
];
</script>
