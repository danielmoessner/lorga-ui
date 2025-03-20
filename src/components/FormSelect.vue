<template>
  <label :for="name" class="relative block">
    <FormLabel v-if="label" :required="required" :label="label" />
    <div class="flex items-center space-x-2" :class="{ 'mt-1': label }">
      <select
        :id="`form--${name}`"
        v-model="model"
        :name="name"
        class="block w-full py-2 pl-3 pr-6 placeholder-gray-400 bg-no-repeat border border-gray-300 rounded-md shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-formcolor focus:border-formcolor focus:ring-1 sm:text-sm"
        :style="style"
      >
        <option
          v-for="option in internalOptions"
          :key="option.name"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
    <FormHelptext :helptext="helptext" />
  </label>
</template>

<script lang="ts" setup>
import FormLabel from "./FormLabel.vue";
import FormHelptext from "./FormHelptext.vue";
import { computed } from "vue";
import { FormOptionInput } from "../types/form";

type FormOption = { name: string; value: string | null | undefined };

const props = defineProps<{
  label?: string;
  helptext?: string;
  modelValue?: string | number | boolean;
  name?: string;
  options?: FormOptionInput[] | undefined;
  required?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const style = {
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: "right 0.5rem center",
  backgroundSize: "1.5em 1.5em",
};

const model = computed({
  get() {
    if (props.modelValue) return props.modelValue;
    return null;
  },
  set(newValue: string | boolean | null) {
    emit("update:modelValue", newValue);
  },
});

const formOptions = computed<FormOption[]>(() => {
  if (!props.options) return [];
  return props.options.map((o: FormOptionInput) => {
    if (typeof o === "string")
      return {
        name: o,
        value: o,
      };
    else {
      let value: string | undefined = undefined;
      if (o.value) value = String(o.value);
      else if (o.id) value = String(o.id);
      else if (o.uuid) value = String(o.uuid);
      return {
        name: o.name || "-",
        value: value,
      };
    }
  });
});

const internalOptions = computed<FormOption[]>(() => {
  if (props.required) return formOptions.value;
  return [{ name: "------", value: null }, ...formOptions.value];
});
</script>
