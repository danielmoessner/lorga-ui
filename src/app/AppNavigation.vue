<template>
  <ul class="flex space-x-3 border-b border-slate-400 pb-1">
    <li v-for="route in routes" :key="route.path">
      <router-link v-if="route.meta?.name" :to="route.path">
        {{ route.meta.name }}
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { routes } from "../routes";
</script>
