<script setup lang="ts">
import FormFields from "../components/FormFields.vue";
import { FormField } from "../types/form";

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
    name: "slot03",
    type: "slot",
  },
];
</script>

<template>
  <div class="max-w-md p-10">
    <FormFields
      :fields="fields"
      :data="{}"
      :on-update="() => {}"
      :get-error="() => undefined"
    >
      <template #slot03>
        <div class="bg-red-500">Slot 03</div>
      </template>
    </FormFields>
  </div>
</template>
