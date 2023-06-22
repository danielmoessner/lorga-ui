<template>
  <div
    aria-live="assertive"
    class="fixed inset-0 z-50 flex items-end justify-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start print:hidden"
  >
    <transition-group
      tag="div"
      enter-active-class="transition duration-300 ease-out transform"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="absolute transition duration-200 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-75 opacity-0"
      move-class="transition duration-700 ease"
      class="block w-full max-w-sm"
    >
      <div v-for="alert in alerts" :key="alert.id" class="w-full max-w-sm mb-4">
        <Alert :alert="alert" @close="close($event)" />
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import Alert from "./AlertItem.vue";
import { AlertItem } from "../types/alert";

defineProps({
  alerts: {
    required: true,
    default: () => [],
    type: Array as PropType<AlertItem[]>,
  },
});

const emit = defineEmits(["close"]);

const close = (item: AlertItem) => {
  emit("close", item);
};
</script>
