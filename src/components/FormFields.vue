<script setup lang="ts">
import { FormField } from "../types/form";
import FormTextarea from "./FormTextarea.vue";
import FormSelect from "./FormSelect.vue";
import FormMultiple from "./FormMultiple.vue";
import FormInput from "./FormInput.vue";
import FormList from "./FormList.vue";
import FormToggle from "./FormToggle.vue";
import FormFile from "./FormFile.vue";
import FormCombobox from "./FormCombobox.vue";
import FormCheckbox from "./FormCheckbox.vue";
import FormFiles from "./FormFiles.vue";
import { computed, toRefs } from "vue";
import FormSearchSelect from "./FormSearchSelect.vue";

const props = defineProps<{
  fields: FormField[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue: Record<string, any> | undefined;
  errors: Record<string, string[] | Record<string, string[]>> | undefined;
}>();
const { errors, modelValue } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

if (!modelValue.value) emit("update:modelValue", {});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model = computed<Record<string, any>>({
  get() {
    return props.modelValue ? props.modelValue : {};
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const internalErrors = computed<
  Record<string, string[] | Record<string, string[]>>
>(() => {
  if (!errors.value) return {};
  return errors.value;
});
</script>

<template>
  <template v-for="field in fields" :key="field.name">
    <div
      v-if="field.type === 'fields'"
      class="grid grid-cols-1 gap-4 pt-4 mt-2 border-t border-gray-300"
    >
      <FormFields
        v-model="model[field.name]"
        :fields="field.fields"
        :errors="(internalErrors[field.name] as Record<string, string[]>)"
      />
    </div>
    <FormTextarea
      v-else-if="field.type === 'textarea'"
      v-model="model[field.name]"
      :label="field.label"
      :name="field.name"
      :type="field.type"
      :required="field.required"
      :placeholder="field.placeholder"
    />
    <template v-else-if="field.type === 'custom'">
      <slot name="custom" :data="modelValue" />
    </template>
    <FormSelect
      v-else-if="field.type === 'select'"
      v-model="model[field.name]"
      :label="field.label"
      :name="field.name"
      :required="field.required"
      :options="field.options"
      :helptext="field.helptext"
    />
    <FormMultiple
      v-else-if="field.type === 'multiple'"
      v-model="model[field.name]"
      :label="field.label"
      :name="field.name"
      :required="field.required"
      :options="field.options"
      :helptext="field.helptext"
    />
    <FormList
      v-else-if="field.type === 'list'"
      v-model="model[field.name]"
      :required="field.required"
      :label="field.label"
      :helptext="field.helptext"
      :name="field.name"
    />
    <FormToggle
      v-else-if="field.type === 'toggle'"
      v-model="model[field.name]"
      :label="field.label"
      :name="field.name"
      :helptext="field.helptext"
    />
    <FormFile
      v-else-if="field.type === 'file'"
      v-model="model[field.name]"
      :label="field.label"
      :autocomplete="field.autocomplete"
      :name="field.name"
      :disabled="field.disabled"
      :required="field.required"
      :placeholder="field.placeholder"
      :helptext="field.helptext"
    />
    <FormFiles
      v-else-if="field.type === 'files'"
      v-model="model[field.name]"
      :label="field.label"
      :autocomplete="field.autocomplete"
      :name="field.name"
      :disabled="field.disabled"
      :required="field.required"
      :placeholder="field.placeholder"
      :helptext="field.helptext"
    />
    <FormCombobox
      v-else-if="field.type === 'combobox'"
      v-model="model[field.name]"
      :label="field.label"
      :name="field.name"
      :options="field.options"
      :required="field.required"
      :helptext="field.helptext"
    />
    <FormSearchSelect
      v-else-if="field.type === 'searchselect'"
      v-model="model[field.name]"
      :label="field.label"
      :name="field.name"
      :options="field.options"
      :required="field.required"
      :helptext="field.helptext"
    />
    <FormCheckbox
      v-else-if="field.type === 'checkbox'"
      v-model="model[field.name]"
      :label="field.label"
      :name="field.name"
      :options="field.options"
      :required="field.required"
      :helptext="field.helptext"
    />
    <div v-else-if="field.type === 'hidden'" class="hidden">
      <FormInput
        v-model="model[field.name]"
        :label="field.label"
        :autocomplete="field.autocomplete"
        :name="field.name"
        :disabled="field.disabled"
        :type="field.type"
        :required="field.required"
        :placeholder="field.placeholder"
        :helptext="field.helptext"
      />
    </div>
    <FormInput
      v-else
      v-model="model[field.name]"
      :label="field.label"
      :autocomplete="field.autocomplete"
      :name="field.name"
      :disabled="field.disabled"
      :type="field.type"
      :required="field.required"
      :placeholder="field.placeholder"
      :helptext="field.helptext"
    />
    <p
      v-if="internalErrors[field.name]"
      class="text-red-700 text-sm leading-tight ml-1.5 mt-1 whitespace-pre-line"
    >
      {{ internalErrors[field.name][0] }}
    </p>
  </template>
</template>
