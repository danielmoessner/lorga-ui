<template>
  <div>
    <CP1 />
  </div>
</template>

<script setup lang="ts">
import { setupConfig } from "./config";
import CP1 from "./views/PropsDestructure.vue";

setupConfig();
</script>
