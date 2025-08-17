<template>
  <div class="flex items-center justify-center p-64">
    <ButtonToggle v-model="enabled" text="Test Toggle" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ButtonToggle from "../components/ButtonToggle.vue";

const enabled = ref(false);
</script>
