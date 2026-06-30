<template>
  <div class="">
    <Combobox v-slot="{ open }" v-model="model" :name="name">
      <ComboboxLabel class="relative block">
        <FormLabel :required="required" :label="label" />
        <div class="relative mt-1">
          <div class="relative flex items-center">
            <ComboboxInput
              class="block w-full py-2 pl-3 pr-6 placeholder-gray-400 bg-no-repeat border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-formcolor focus:border-formcolor focus:ring-1 sm:text-sm"
              :display-value="
                (o) => formOptions.find((i) => i.value === o)?.name || ''
              "
              @change="query = $event.target.value"
              @click="inputClicked()"
            />
            <ComboboxButton
              ref="button"
              class="absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <ChevronUpDownIcon
                class="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </ComboboxButton>
          </div>
          <TransitionRoot
            leave="transition ease-in duration-100"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <ComboboxOptions
              :static="true"
              :unmount="false"
              class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <li
                v-if="filteredOptions.length === 0 && query !== ''"
                class="relative px-4 py-2 text-gray-700 cursor-default select-none"
              >
                Nothing found.
              </li>

              <ComboboxOption
                v-for="option in filteredOptions"
                :key="`${option.name}${option.value}`"
                v-slot="{ selected, active }"
                as="template"
                :value="option.value"
                @click="optionClicked(open)"
              >
                <li
                  class="relative py-2 pl-10 pr-4 cursor-pointer select-none"
                  :class="{
                    'bg-formcolor text-white': active,
                    'text-gray-900': !active,
                  }"
                >
                  <span
                    class="block truncate"
                    :class="{
                      'font-medium': selected,
                      'font-normal': !selected,
                    }"
                  >
                    {{ option.name }}
                  </span>
                  <span
                    v-show="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3"
                    :class="{
                      'text-white': active,
                      'text-formcolor': !active,
                    }"
                  >
                    <CheckIcon class="w-5 h-5" aria-hidden="true" />
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </div>
      </ComboboxLabel>
      <FormHelptext :helptext="helptext" />
    </Combobox>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRefs, PropType } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  ComboboxLabel,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import FormLabel from "./FormLabel.vue";
import FormHelptext from "./FormHelptext.vue";
import { FormOptionInput } from "../types/form";

type FormOption = { name: string; value: string | undefined };

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
    type: [String, Number] as PropType<string | number | undefined>,
    required: false,
    default: undefined,
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

const emit = defineEmits(["update:modelValue"]);

const { modelValue, options, name, required, label, helptext } = toRefs(props);

const model = computed<string>({
  get: () => {
    return `${modelValue?.value}`;
  },
  set: (v: string) => {
    emit("update:modelValue", v);
  },
});

let query = ref("");

const formOptions = computed<FormOption[]>(() => {
  if (!options.value) return [];
  return options.value.map((o: FormOptionInput) => {
    if (typeof o === "string")
      return {
        name: o,
        value: o,
      };
    else {
      let value = "-";
      if (o.value) value = String(o.value);
      else if (o.id) value = String(o.id);
      return {
        name: o.name || "-",
        value: value,
      };
    }
  });
});

let filteredOptions = computed<FormOption[]>(() => {
  if (query.value === "") return formOptions.value;

  return formOptions.value.filter((o) =>
    o.name
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.value.toLowerCase().replace(/\s+/g, "")),
  );
});

// open on focus
const button = ref();
const clickOpenButton = () => {
  // button.value.$el.click();
};
const inputClicked = () => {
  clickOpenButton();
};
const optionClicked = (open: boolean) => {
  if (open) clickOpenButton();
};
</script>
