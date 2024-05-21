<template>
  <div>
    <CP1 />
  </div>
</template>

<script setup lang="ts">
import { setupConfig } from "./config";
import CP1 from "./views/TableGenerator.vue";

setupConfig();
</script>
