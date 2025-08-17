<template>
  <div class="max-w-lg pt-40 mx-auto">
    <FormTextarea v-model="test" label="Test" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormTextarea from "../components/FormTextarea.vue";

const test = ref("");

setTimeout(() => (test.value = "sadfadsfdas\n\ngfsdafgfdfsgfsd\nasfsa"), 1000);
</script>
