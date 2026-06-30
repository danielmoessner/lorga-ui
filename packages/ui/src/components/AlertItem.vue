<template>
  <div
    class="w-full overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto group ring-1 ring-black ring-opacity-5"
    @mouseover="mouseover = true"
    @mouseleave="mouseover = false"
  >
    <div class="p-4" :class="{ 'py-3.5': !alert.message }">
      <div class="flex items-start">
        <div class="shrink-0">
          <CheckCircleIcon
            v-if="alert.type === 'success'"
            class="w-6 h-6 text-green-400"
            aria-hidden="true"
          />
          <ExclamationTriangleIcon
            v-if="alert.type === 'error'"
            class="w-6 h-6 text-red-400"
            aria-hidden="true"
          />
        </div>
        <div class="flex-1 w-0 ml-3">
          <p
            class="block font-medium text-gray-900"
            :class="{
              'text-base': !alert.message,
              'text-sm': !!alert.message,
            }"
          >
            {{ alert.heading }}
          </p>
          <p v-if="alert.message" class="mt-1 text-sm text-gray-500">
            {{ alert.message }}
          </p>
        </div>
        <div class="flex shrink-0 ml-4">
          <button
            class="relative bg-white p-0.5 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:bg-gray-100 focus:ring-gray-200"
            @click="close()"
          >
            <span class="sr-only">Close</span>
            <XMarkIcon class="w-5 h-5" aria-hidden="true" />
            <svg
              class="absolute inset-0 z-0 pointer-events-none button-svg"
              viewbox="24 24"
            >
              <rect
                ref="line"
                x="1"
                y="1"
                width="22"
                height="22"
                stroke-width="2"
                rx="5"
                ry="5"
                fill="none"
                stroke-linejoin="round"
                class="text-gray-400 stroke-current clock group-hover:pause"
              ></rect>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, PropType, ref, watch, onUnmounted } from "vue";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import { XMarkIcon } from "@heroicons/vue/20/solid";
import { AlertItem } from "../types/alert";

// props
const props = defineProps({
  alert: {
    type: Object as PropType<AlertItem>,
    required: true,
  },
});

const { alert } = toRefs(props);

// emit
const emit = defineEmits(["close"]);

// close
const close = () => {
  emit("close", alert.value);
};

// animation
const time = ref(10000);
const mouseover = ref(false);
const closeAt = ref(new Date().getTime() + time.value);
const mouseoverAt = ref(new Date().getTime());
const timeout = ref(setTimeout(() => close(), time.value));

watch(mouseover, (newValue) => {
  if (newValue) {
    mouseoverAt.value = new Date().getTime();
    clearTimeout(timeout.value);
  } else {
    const time = closeAt.value - mouseoverAt.value;
    closeAt.value = new Date().getTime() + time;
    timeout.value = setTimeout(() => close(), time);
  }
});

onUnmounted(() => {
  clearTimeout(timeout.value);
});
</script>

<style scoped>
.remove {
  animation: remove 10s linear 1 both;
}
.clock {
  animation: clock 10s linear 1 both;
}

.pause,
.group:hover .group-hover\:pause {
  animation-play-state: paused;
}

@keyframes clock {
  0% {
    stroke-dasharray: 0, 78.61468505859375;
    stroke-dashoffset: -30;
  }
  10% {
    stroke-dashoffset: -5;
  }
  100% {
    stroke-dasharray: 78.61468505859375, 78.61468505859375;
    stroke-dashoffset: 0;
  }
}
</style>
