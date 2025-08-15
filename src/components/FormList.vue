<script lang="ts" setup>
import FormLabel from "./FormLabel.vue";
import FormHelptext from "./FormHelptext.vue";
import { computed, toRefs } from "vue";
import {
  XMarkIcon,
  PlusIcon,
  ArrowSmallUpIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps<{
  label: string;
  name: string;
  modelValue: string[] | undefined;
  required?: boolean;
  helptext?: string;
  // eslint-disable-next-line no-unused-vars
  getError: (loc: (number | string)[]) => string[];
}>();
const { modelValue } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

type Value = Record<string, string>;

const value = computed<Value>({
  get: () => {
    if (!modelValue.value) {
      return {};
    }
    const ret = modelValue.value.reduce(
      (acc, curr, index) => ({ ...acc, [index + 1]: curr }),
      {},
    );
    return ret;
  },
  set: (val: Value) => {
    emit("update:modelValue", Object.values(val));
  },
});

function add() {
  const key =
    Math.max(...Object.keys(value.value).map((x) => parseInt(x)), 0) + 1;
  const newValue = { ...value.value, [key]: "" };
  value.value = newValue;
}

function remove(key: string) {
  const newValue = { ...value.value };
  delete newValue[key];
  value.value = newValue;
}

function up(k: string) {
  const key = parseInt(k);
  const newValue = { ...value.value };
  if (key > 0) {
    newValue[key] = value.value[key - 1];
    newValue[key - 1] = value.value[key];
  }
  value.value = newValue;
}

function change() {
  emit("update:modelValue", Object.values(value.value));
}
</script>

<template>
  <fieldset class="relative block">
    <legend>
      <FormLabel :required="required" :label="label" />
    </legend>
    <div class="flex items-center mt-2 space-x-2">
      <div class="flex flex-col items-start w-full space-y-2">
        <div
          v-for="(key, index) in Object.keys(value)"
          :key="key"
          class="w-full"
        >
          <div class="flex items-center w-full space-x-3">
            <input
              :id="`form-input-${name}-${key}`"
              v-model="value[key]"
              :name="name"
              type="text"
              class="grow block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-formcolor focus:border-formcolor focus:ring-1 sm:text-sm"
              @change="change()"
            />
            <button
              type="button"
              class="shrink-0 p-1 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-formcolor focus:border-formcolor"
              @click="up(key)"
            >
              <ArrowSmallUpIcon class="w-6 h-6" />
            </button>
            <button
              type="button"
              class="shrink-0 p-1 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-formcolor focus:border-formcolor"
              @click="remove(key)"
            >
              <XMarkIcon class="w-6 h-6" />
            </button>
          </div>
          <p
            v-for="error in getError([index])"
            :key="error"
            class="text-red-700 text-sm leading-tight ml-1.5 mt-1 whitespace-pre-line"
          >
            {{ error }}
          </p>
        </div>
        <button
          type="button"
          class="shrink-0 p-1 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-formcolor focus:border-formcolor"
          @click="add()"
        >
          <PlusIcon class="w-6 h-6" />
        </button>
      </div>
    </div>
    <FormHelptext :helptext="helptext" />
  </fieldset>
</template>
