<template>
  <div class="flex flex-col">
    <div class="-my-2">
      <div class="min-w-full px-0 py-2">
        <div class="overflow-hidden rounded-md shadow">
          <div class="overflow-x-auto overflow-y-hidden">
            <table :class="config.table.table">
              <slot />
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useConfig } from "@/config";

const { config } = useConfig();
</script>
