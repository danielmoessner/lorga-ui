<script setup lang="ts">
import FormFiles from "../components/FormFiles.vue";
import { ref } from "vue";
import { FormField } from "../types/form";
import { FormGenerator } from "..";

const fieldsMultiple: FormField[] = [
  {
    label: "Files",
    type: "files",
    name: "files",
    required: true,
  },
];

const request = () => Promise.resolve();

const files = ref();
</script>

<template>
  <div class="p-20">
    <div>
      <FormFiles v-model="files" name="test" label="test" />
      <FormGenerator
        :request="request"
        :fields="fieldsMultiple"
        label="Person"
        name="person"
        required
        helptext="test"
      />
    </div>
  </div>
</template>
