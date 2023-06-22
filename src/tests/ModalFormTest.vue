<template>
  <ModalForm
    v-model="open"
    :fields="fields"
    title="Delete Field"
    :request="request"
    submit="Delete"
  >
    This text should show up
  </ModalForm>
</template>

<script setup lang="ts">
import { FormField } from "../types/form";
import ModalForm from "../components/ModalForm.vue";
import { ref } from "vue";

const request = () => Promise.resolve();
const open = ref(true);

const fields: FormField[] = [
  {
    label: "Force Delete",
    name: "force_delete",
    type: "checkbox",
    helptext:
      "If this checkbox is set the content inside the data sheets will be deleted as well.",
  },
];
</script>
