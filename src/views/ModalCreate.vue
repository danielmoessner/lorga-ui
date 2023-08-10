<script setup lang="ts">
import ButtonNormal from "../components/ButtonNormal.vue";
import { FormField } from "../types/form";
import { ref } from "vue";
import ModalCreate from "../components/ModalCreate.vue";

const data = ref({});
const request = (d) => Promise.reject({ title: "Command Not Found" });
const modalOpen = ref(false);

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
    name: "nested",
    type: "fields",
    fields: [
      {
        name: "test11",
        label: "Test 11",
        type: "text",
        required: true,
      },
      {
        name: "test12",
        label: "Test 12",
        type: "text",
        required: true,
      },
    ],
  },
];
</script>

<template>
  <div>
    <ButtonNormal kind="action" @click="modalOpen = true">Open</ButtonNormal>
    <ModalCreate
      v-model="modalOpen"
      title="Test"
      submit="Test"
      :fields="fields"
      :request="request"
    >
      <template #bottom>
        {{ data }}
      </template>
    </ModalCreate>
  </div>
</template>
