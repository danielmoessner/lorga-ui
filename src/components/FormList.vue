<template>
  <label :for="name" class="relative block">
    <FormLabel :required="required" :label="label" />
    <div class="flex items-center mt-2 space-x-2">
      <div class="flex flex-col items-start w-full space-y-2">
        <div
          v-for="key in Object.keys(value)"
          :key="key"
          class="flex items-center w-full space-x-3"
        >
          <input
            v-model="value[key]"
            type="text"
            class="flex-grow block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-formcolor focus:border-formcolor focus:ring-1 sm:text-sm"
            @change="change()"
          />
          <button
            type="button"
            class="flex-shrink-0 p-1 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-formcolor focus:border-formcolor"
            @click="up(key)"
          >
            <ArrowSmallUpIcon class="w-6 h-6" />
          </button>
          <button
            type="button"
            class="flex-shrink-0 p-1 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-formcolor focus:border-formcolor"
            @click="remove(key)"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
        <button
          type="button"
          class="flex-shrink-0 p-1 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-formcolor focus:border-formcolor"
          @click="add()"
        >
          <PlusIcon class="w-6 h-6" />
        </button>
      </div>
    </div>
    <FormHelptext :helptext="helptext" />
  </label>
</template>

<script lang="ts">
import FormLabel from "./FormLabel.vue";
import FormHelptext from "./FormHelptext.vue";
import { defineComponent, PropType } from "vue";
import {
  XMarkIcon,
  PlusIcon,
  ArrowSmallUpIcon,
} from "@heroicons/vue/24/outline";

export default defineComponent({
  components: {
    FormHelptext,
    XMarkIcon,
    FormLabel,
    PlusIcon,
    ArrowSmallUpIcon,
  },
  props: {
    label: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    modelValue: {
      required: false,
      default: () => [],
      type: Array as PropType<string[]>,
    },
    required: {
      required: false,
      default: false,
      type: Boolean,
    },
    helptext: {
      required: false,
      default: "",
      type: String,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      value: {} as { [key: number]: string },
    };
  },
  watch: {
    modelValue(newValue) {
      this.value = {};
      newValue.forEach((element: string, index: number) => {
        this.value[index] = element;
      });
    },
  },
  methods: {
    add() {
      const key =
        Math.max(...Object.keys(this.value).map((x) => parseInt(x)), 0) + 1;
      this.value[key] = "";
      this.change();
    },
    remove(key: string) {
      delete this.value[key];
      this.change();
    },
    up(k: string) {
      const key = parseInt(k);
      if (key > 0) {
        const temp = this.value[key];
        this.value[key] = this.value[key - 1];
        this.value[key - 1] = temp;
      }
      this.change();
    },
    change() {
      this.$emit("update:modelValue", Object.values(this.value));
    },
  },
});
</script>
