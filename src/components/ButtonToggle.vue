<template>
  <SwitchGroup as="div" class="flex items-center">
    <Switch
      v-model="model"
      :class="[
        model ? 'bg-formcolor' : 'bg-gray-200',
        'relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-formcolor focus:ring-offset-2',
      ]"
    >
      <span
        aria-hidden="true"
        :class="[
          model ? 'translate-x-4' : 'translate-x-0',
          'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        ]"
      />
    </Switch>
    <SwitchLabel as="span" class="ml-1.5 leading-none">
      <span class="text-sm font-medium text-formcolor">{{ text }}</span>
    </SwitchLabel>
  </SwitchGroup>
</template>

<script setup lang="ts">
import { toRefs, computed } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

const props = defineProps<{ text: string; modelValue: boolean }>();

const emit = defineEmits(["update:modelValue"]);

const { modelValue } = toRefs(props);

const model = computed({
  get: () => {
    return modelValue.value;
  },
  set: (v) => {
    emit("update:modelValue", v);
  },
});
</script>
