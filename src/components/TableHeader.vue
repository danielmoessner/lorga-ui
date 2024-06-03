<template>
  <th :class="config.table.th">
    <slot />
  </th>
</template>

<script lang="ts" setup>
import { useConfig } from "@/config";

const { config } = useConfig();
</script>
