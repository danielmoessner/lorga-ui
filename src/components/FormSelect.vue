<template>
  <label :for="name" class="relative block">
    <FormLabel :required="required" :label="label" />
    <div class="flex items-center mt-1 space-x-2">
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

<script lang="ts">
import FormLabel from "./FormLabel.vue";
import FormHelptext from "./FormHelptext.vue";
import { defineComponent, PropType } from "vue";
import { FormOptionInput } from "../types/form";

type FormOption = { name: string; value: string | null };

export default defineComponent({
  components: {
    FormHelptext,
    FormLabel,
  },
  props: {
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
      type: [String, Number, Boolean],
    },
    name: {
      required: false,
      type: String,
      default: "",
    },
    options: {
      required: false,
      type: Array as PropType<FormOptionInput[] | undefined>,
      default: () => [],
    },
    required: {
      required: false,
      default: false,
      type: Boolean,
    },
  },
  emits: ["update:modelValue"],
  computed: {
    style() {
      return {
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: "right 0.5rem center",
        backgroundSize: "1.5em 1.5em",
      };
    },
    model: {
      get() {
        if (this.modelValue) return this.modelValue;
        return null;
      },
      set(newValue: string | boolean | null) {
        this.$emit("update:modelValue", newValue);
      },
    },
    formOptions(): FormOption[] {
      if (!this.options) return [];
      return this.options.map((o: FormOptionInput) => {
        if (typeof o === "string")
          return {
            name: o,
            value: o,
          };
        else {
          let value = "-";
          if (o.value) value = String(o.value);
          else if (o.id) value = String(o.id);
          else if (o.uuid) value = String(o.uuid);
          return {
            name: o.name || "-",
            value: value,
          };
        }
      });
    },
    internalOptions(): FormOption[] {
      if (this.required) return this.formOptions;
      return [{ name: "------", value: null }, ...this.formOptions];
    },
  },
});
</script>
