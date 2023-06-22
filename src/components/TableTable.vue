<template>
  <div class="flex flex-col">
    <div class="-mx-6 -my-2">
      <div class="min-w-full px-6 py-2">
        <div class="overflow-hidden rounded-md shadow">
          <div class="overflow-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <slot />
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
