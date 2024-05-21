<template>
  <td :class="config?.table.td">
    <slot />
  </td>
</template>

<script setup lang="ts">
import { useConfig } from "@/config";

const { config } = useConfig();
</script>
