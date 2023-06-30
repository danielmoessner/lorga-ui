<script setup lang="ts">
import ButtonNormal from "../components/ButtonNormal.vue";
import { FormField } from "../types/form";
import { ref } from "vue";
import ModalCreate from "../components/ModalCreate.vue";

const data = ref({});
const request = (d) => Promise.resolve().then(() => (data.value = d));
const modalOpen = ref(false);

const fields: FormField[] = [
  {
    name: "test",
    label: "Test",
    type: "text",
    required: true,
  },
  {
    name: "nested",
    type: "fields",
    fields: [
      {
        name: "test",
        label: "Test",
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
