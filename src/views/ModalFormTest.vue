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
    label: "Options",
    name: "force_delete",
    type: "checkbox",
    helptext: "These options add conditions on how to delete the object.",
    options: [
      {
        name: "Force Delete",
        value: "force_delete",
      },
      {
        name: "Delete Instantly",
        value: "delete_instantly",
      },
    ],
  },
];
</script>
