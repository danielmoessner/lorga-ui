<script setup lang="ts">
import { ref } from "vue";
import OtherStuffChild from "./OtherStuffChild.vue";

const n = ref(3);
</script>

<template>
  <div>
    OtherStuff
    <button @click="n++">Increment</button>
  </div>
  <OtherStuffChild :number="n" />
</template>
