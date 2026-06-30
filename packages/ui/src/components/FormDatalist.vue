<script lang="ts" setup>
import FormLabel from "./FormLabel.vue";
import FormHelptext from "./FormHelptext.vue";
import { PropType, computed, toRefs } from "vue";

const props = defineProps({
  label: {
    required: true,
    type: String,
  },
  helptext: {
    required: false,
    default: "",
    type: String,
  },
  modelValue: {
    required: false,
    default: "",
    type: String,
  },
  name: {
    required: false,
    type: String,
    default: "",
  },
  options: {
    required: false,
    type: Array as PropType<string[] | undefined>,
    default: () => [],
  },
  required: {
    required: false,
    default: false,
    type: Boolean,
  },
});

const { modelValue } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

const model = computed<string>({
  get: () => {
    return `${modelValue?.value}`;
  },
  set: (v: string) => {
    emit("update:modelValue", v);
  },
});
</script>

<template>
  <label :for="name" class="relative block">
    <FormLabel :required="required" :label="label" />
    <div class="flex items-center mt-1 space-x-2">
      <input
        :id="`form--${name}`"
        v-model="model"
        :list="`form--${name}-options`"
        :name="name"
        class="block w-full py-2 pl-3 pr-6 placeholder-gray-400 bg-no-repeat border border-gray-300 rounded-md shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-formcolor focus:border-formcolor focus:ring-1 sm:text-sm"
      />
      <datalist
        :id="`form--${name}-options`"
        class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 sm:text-sm"
      >
        <option v-for="option in options" :key="option" :value="option" />
      </datalist>
    </div>
    <FormHelptext :helptext="helptext" />
  </label>
</template>
