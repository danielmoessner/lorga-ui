<template>
  <div class="px-10 pt-3">
    <AppNavigation />
    <div class="bg-gray-200 p-5 rounded mt-3 min-h-64">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { setupConfig } from "./config";
import AppNavigation from "./app/AppNavigation.vue";

setupConfig();
</script>
