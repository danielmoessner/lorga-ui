<template>
  <AlertList :alerts="alerts" @close="close($event)"></AlertList>
  <div class="relative bg-gray-100 w-96 h-96 p-96">
    <Transition
      enter-active-class="absolute transition-all duration-1000"
      enter-from-class="left-10"
      enter-to-class="left-64"
      leave-from-class="left-20"
      leave-to-class="left-32"
      :class="{ 'left-64': show }"
    >
      <div
        v-if="show"
        class="absolute w-10 h-10 bg-red-500"
        :class="{ '': show }"
      ></div>
    </Transition>
  </div>
  <button type="button" @click="show = !show">click me {{ show }}</button>
  <br />
  <br />
  <button type="button" @click="resetAlerts()">reset alerts</button>
  <br />
  <br />
  <br />
  <div class="relative w-6 h-6 bg-blue-100 rounded-2xl">
    <svg
      class="absolute top-0 left-0 z-0 w-full h-full pointer-events-none button-svg"
      viewbox="24 24"
    >
      <rect
        ref="line"
        x="1"
        y="1"
        width="22"
        height="22"
        stroke="red"
        stroke-width="2"
        rx="5"
        ry="5"
        fill="none"
        stroke-linejoin="round"
        :stroke-dashoffset="offset"
        class="text-gray-500 stroke-current clock"
      />
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="none"
        class="text-black origin-center -rotate-90 stroke-current clock"
        stroke-width="2"
      ></circle>
    </svg>
  </div>
  <div class="max-w-lg pl-20">
    <FormInput
      v-model="offset"
      name="test1"
      type="number"
      label="offset"
      :step="10"
    />
    <FormInput
      v-model="dash"
      name="test2"
      type="number"
      label="dash"
      :step="10"
    />
  </div>
  <div class="h-64">{{ totalLength }}</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import AlertList from "../components/AlertList.vue";
import { AlertItem } from "../types/alert";
import { FormInput } from "..";

const offset = ref(0);
const dash = ref(0);

const show = ref(false);

const line = ref();
const totalLength = computed(() => {
  if (line.value) return line.value.getTotalLength();
  return 0;
});

const originalAlerts = [
  {
    id: "dasf",
    type: "success",
    heading: "Attention",
    message: "Something good happened.",
    created: 12321321321,
  },
  {
    id: "jkjkjk",
    type: "error",
    heading: "Attention",
    message: "Something bad happened.",
    created: 12321321321,
  },
] as AlertItem[];

const alerts = ref<AlertItem[]>([...originalAlerts]);

const close = (alert) => {
  const index = alerts.value.findIndex((item) => item.id === alert.id);
  if (index !== -1) alerts.value.splice(index, 1);
};

const resetAlerts = () => {
  alerts.value = [...originalAlerts];
};
</script>

<style scoped>
.clock {
  animation: clock 2s linear infinite both;
}

.pause,
.group:hover .group-hover\:pause {
  animation-play-state: paused;
}

@keyframes clock {
  0% {
    stroke-dasharray: 0, 78.61468505859375;
  }
  100% {
    stroke-dasharray: 78.61468505859375, 78.61468505859375;
  }
}
</style>
