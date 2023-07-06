<script setup lang="ts">
import { FormOptionInput } from "../types/form";
import useFormOptions from "../composables/useFormOptions";
import { computed, ref, toRefs, watch } from "vue";
import FormLabel from "./FormLabel.vue";

const props = defineProps<{
  label: string;
  helptext?: string;
  modelValue: string | number | undefined;
  options: FormOptionInput[] | undefined;
  name: string;
  required?: boolean;
}>();
const { modelValue, options, name } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

const model = computed<string | number | undefined>({
  get: () => {
    return `${modelValue.value}`;
  },
  set: (v: string | number | undefined) => {
    emit("update:modelValue", v);
  },
});

const { formOptions } = useFormOptions(options);

const search = ref();
const formOptionsSearch = computed(() => {
  if (!search.value) return formOptions.value;
  return formOptions.value.filter((o) =>
    o.name.toLowerCase().includes(search.value.toLowerCase()),
  );
});
watch(search, () => {
  if (!search.value) model.value = undefined;
  else if (formOptionsSearch.value.some((o) => o.value === model.value)) return;
  else if (formOptionsSearch.value.length > 0)
    model.value = formOptionsSearch.value[0].value;
  else model.value = undefined;
});

const id = computed(() => `form-search-select-${name.value}`);
</script>

<template>
  <label :for="id" class="relative block">
    <div>
      <FormLabel :required="required" :label="label" />
    </div>
    <div class="flex items-center">
      <input
        v-model="search"
        :list="name"
        class="inline-block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 shadow-sm appearance-none rounded-l-md focus:outline-none focus:ring-1 focus-within:ring-1 focus-within:ring-formcolor focus-within:border-formcolor focus:ring-formcolor focus:border-formcolor sm:text-sm"
      />
      <select
        :id="id"
        v-model="model"
        class="inline-block w-full py-2 pl-3 pr-6 placeholder-gray-400 bg-no-repeat border border-gray-300 shadow-sm appearance-none cursor-pointer rounded-r-md focus:outline-none focus:ring-formcolor focus:border-formcolor focus:ring-1 sm:text-sm"
      >
        <option
          v-for="option in formOptionsSearch"
          :key="option.value"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
  </label>
</template>

<style scoped>
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-size: 1.5em 1.5em;
}
</style>
