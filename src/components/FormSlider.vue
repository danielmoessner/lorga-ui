<template>
  <label class="relative block">
    <div>
      <FormLabel :required="required" :label="label" />
    </div>
    <div class="relative flex items-center" :class="{ 'mt-1': !!label }">
      <input
        v-model.number="model"
        type="range"
        :step="step"
        :min="min"
        :max="max"
        :required="required"
        :disabled="disabled"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none ring-2 ring-offset-4 ring-transparent focus:ring-formcolor accent-formcolor"
        :class="{
          'opacity-50 pointer-events-none': disabled,
        }"
      />
      <span
        class="absolute right-0 text-xs text-right text-gray-700 -top-5 tabular-nums min-w-10"
      >
        {{ model }}{{ unit }}
      </span>
    </div>
    <FormHelptext :helptext="helptext" />
  </label>
</template>

<script lang="ts" setup>
import FormLabel from "./FormLabel.vue";
import FormHelptext from "./FormHelptext.vue";
import { computed, toRefs } from "vue";

const props = withDefaults(
  defineProps<{
    label: string;
    helptext?: string;
    modelValue?: number;
    step?: number;
    min?: number;
    max?: number;
    required?: boolean;
    disabled?: boolean;
    unit?: string;
  }>(),
  {
    modelValue: 0,
    helptext: "",
    step: 1,
    min: 0,
    max: 100,
    required: false,
    disabled: false,
    unit: "",
  },
);

const { modelValue } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => {
    return modelValue.value;
  },
  set: (v) => {
    emit("update:modelValue", v);
  },
});
</script>
