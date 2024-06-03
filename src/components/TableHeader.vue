<template>
  <th
    :class="config.table.th"
  >
    <slot />
  </th>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useConfig } from "..";

export default defineComponent({});

const { config } = useConfig();
</script>
