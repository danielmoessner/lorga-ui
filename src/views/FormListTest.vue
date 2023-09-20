<script setup lang="ts">
import ButtonNormal from "../components/ButtonNormal.vue";
import { FormField } from "../types/form";
import { computed, ref } from "vue";
import ModalUpdate from "../components/ModalUpdate.vue";

const commandModalOpen = ref(false);
const request = () => Promise.resolve();
const fields = computed<FormField[]>(() => [
  {
    label: "Properties",
    name: "property_names",
    type: "list",
    required: true,
  },
]);

const propertyNames = ref(["name", "description", "price"]);
</script>

<template>
  <ButtonNormal kind="action" @click="commandModalOpen = true">
    Reorder Properties
  </ButtonNormal>
  <ModalUpdate
    v-model="commandModalOpen"
    title="Reorder Properties"
    :fields="fields"
    :request="request"
    :data="{
      property_names: propertyNames,
    }"
  />
</template>
