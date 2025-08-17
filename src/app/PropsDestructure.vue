<script lang="ts" setup>
import { ref } from "vue";
import PropsDestructureChild from "./PropsDestructureChild.vue";

const text = ref<string>("Hello World!");
</script>

<template>
  <input v-model="text" type="text" />
  <h1>Props Destructure</h1>
  <p>{{ text }}</p>
  <PropsDestructureChild :text="text" />
</template>
