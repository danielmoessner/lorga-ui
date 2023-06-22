<template>
  <fieldset class="space-yx">
    <legend>
      <FormLabel :label="label" :required="required" />
    </legend>
    <div
      v-for="(option, index) in formOptions"
      :key="option.name"
      class="relative flex items-start mt-3"
    >
      <div class="flex items-center h-5">
        <input
          :id="`${id}-${index}`"
          v-model="model"
          :aria-describedby="option.name"
          :value="option.value"
          type="checkbox"
          class="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
        />
      </div>
      <div class="ml-3 text-sm">
        <label
          :for="option.name"
          class="font-medium text-gray-700 cursor-pointer"
        >
          {{ option.name }}
          <span v-if="option.required" class="text-gray-500">(Required)</span>
        </label>
      </div>
    </div>
    <div v-if="helptext" class="mt-4">
      <FormHelptext :helptext="helptext" />
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { computed, PropType, toRefs } from "vue";
import { FormOptionInput } from "../types/form";
import FormHelptext from "./FormHelptext.vue";
import FormLabel from "./FormLabel.vue";

type FormOption = { name: string; value: string; required: boolean };

// props
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
    default: () => [],
    type: Array as PropType<string[]>,
  },
  options: {
    required: false,
    type: Array as PropType<FormOptionInput[] | undefined>,
    default: () => [],
  },
  name: {
    required: true,
    type: String,
  },
  required: {
    required: false,
    default: false,
    type: Boolean,
  },
});
const { options, modelValue, name } = toRefs(props);

// id
const id = computed(() => `form-checkbox-${name.value}`);

// options
const formOptions = computed<FormOption[]>(() => {
  if (!options.value) return [];
  return options.value.map((o: FormOptionInput) => {
    if (typeof o === "string")
      return {
        name: o,
        value: o,
        required: false,
      };
    else {
      let value = "-";
      if (o.value) value = String(o.value);
      else if (o.id) value = String(o.id);
      return {
        name: o.name || "-",
        value: value,
        required: o.required || false,
      };
    }
  });
});

// emit
const emit = defineEmits(["update:modelValue"]);

// model
const model = computed<string[]>({
  get: () => {
    return modelValue.value.map((v) => String(v));
  },
  set: (value: string[] | string) => {
    emit("update:modelValue", value);
  },
});
</script>
