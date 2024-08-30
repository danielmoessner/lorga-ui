<template>
  <ButtonNormal @click="open = true">Open Modal</ButtonNormal>
  <ModalForm
    v-model="open"
    :fields="fields"
    title="Delete Field"
    :request="request"
    submit="Delete"
    :data="{ select: 'option2' }"
    @change="change"
    @success="success"
  >
    <template #slot="{ data }">
      {{ data }}
    </template>
    This text should show up
  </ModalForm>
</template>

<script setup lang="ts">
import { FormField } from "../types/form";
import ModalForm from "../components/ModalForm.vue";
import { ref } from "vue";
import ButtonNormal from "@/components/ButtonNormal.vue";

const success = (d1, d2) => {
  console.log(d1, d2);
};

const request = () => Promise.resolve({ request: "success" });
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
  {
    label: "Select",
    name: "select",
    options: [
      { name: "Option 1", value: "option1" },
      { name: "Option 2", value: "option2" },
    ],
    type: "select",
  },
  {
    name: "slot",
    type: "slot",
  },
];

const change = (data) => {
  // console.log(data);
};
</script>
