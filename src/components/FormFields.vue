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
import FormDatalist from "./FormDatalist.vue";

const props = defineProps<{
  fields: FormField[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> | undefined; // read-only?
  // eslint-disable-next-line no-unused-vars
  getError: (loc: string[]) => string[] | undefined;
  // eslint-disable-next-line no-unused-vars
  onUpdate: (loc: string[], value: unknown) => void;
}>();
const { onUpdate, data } = toRefs(props);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const internalData = computed<Record<string, any>>(() => {
  return data.value ? data.value : {};
});

const nestedOnUpdate = (field: string) => {
  return (loc: string[], value: unknown) => {
    return onUpdate.value([field, ...loc], value);
  };
};

const nestedGetError = (field: string) => {
  return (loc: string[]) => {
    return props.getError([field, ...loc]);
  };
};
</script>

<template>
  <template v-for="field in fields" :key="field.name">
    <FormFields
      v-if="field.type === 'fields'"
      :data="internalData[field.name]"
      :on-update="nestedOnUpdate(field.name)"
      :fields="field.fields"
      :get-error="nestedGetError(field.name)"
    />
    <div v-else>
      <FormTextarea
        v-if="field.type === 'textarea'"
        :model-value="internalData[field.name]"
        :label="field.label"
        :name="field.name"
        :type="field.type"
        :required="field.required"
        :placeholder="field.placeholder"
        @update:model-value="onUpdate([field.name], $event)"
      />
      <template v-else-if="field.type === 'custom'">
        <slot name="custom" :data="internalData" />
      </template>
      <FormSelect
        v-else-if="field.type === 'select'"
        :model-value="internalData[field.name]"
        :label="field.label"
        :name="field.name"
        :required="field.required"
        :options="field.options"
        :helptext="field.helptext"
        @update:model-value="onUpdate([field.name], $event)"
      />
      <FormDatalist
        v-else-if="field.type === 'datalist'"
        :model-value="internalData[field.name]"
        :label="field.label"
        :name="field.name"
        :required="field.required"
        :options="(field.options as string[])"
        :helptext="field.helptext"
        @update:model-value="onUpdate([field.name], $event)"
      />
      <FormMultiple
        v-else-if="field.type === 'multiple'"
        :model-value="internalData[field.name]"
        :label="field.label"
        :name="field.name"
        :required="field.required"
        :options="field.options"
        :helptext="field.helptext"
        @update:model-value="onUpdate([field.name], $event)"
      />
      <FormList
        v-else-if="field.type === 'list'"
        :model-value="internalData[field.name]"
        :required="field.required"
        :label="field.label"
        :helptext="field.helptext"
        :name="field.name"
        @update:model-value="onUpdate([field.name], $event)"
      />
      <FormToggle
        v-else-if="field.type === 'toggle'"
        :model-value="internalData[field.name]"
        :label="field.label"
        :name="field.name"
        :helptext="field.helptext"
        @update:model-value="onUpdate([field.name], $event)"
      />
      <FormFile
        v-else-if="field.type === 'file'"
        :model-value="internalData[field.name]"
        :label="field.label"
        :autocomplete="field.autocomplete"
        :name="field.name"
        :disabled="field.disabled"
        :required="field.required"
        :placeholder="field.placeholder"
        :helptext="field.helptext"
        @update:model-value="onUpdate([field.name], $event)"
      />
      <FormFiles
        v-else-if="field.type === 'files'"
        :model-value="internalData[field.name]"
        :label="field.label"
        :autocomplete="field.autocomplete"
        :name="field.name"
        :disabled="field.disabled"
        :required="field.required"
        :placeholder="field.placeholder"
        :helptext="field.helptext"
        @update:model-value="onUpdate([field.name], $event)"
      />
      <FormCombobox
        v-else-if="field.type === 'combobox'"
        :model-value="internalData[field.name]"
        :label="field.label"
        :name="field.name"
        :options="field.options"
        :required="field.required"
        :helptext="field.helptext"
        @update:model-value="onUpdate([field.name], $event)"
      />
      <FormSearchSelect
        v-else-if="field.type === 'searchselect'"
        :model-value="internalData[field.name]"
        :label="field.label"
        :name="field.name"
        :options="field.options"
        :required="field.required"
        :helptext="field.helptext"
        @update:model-value="onUpdate([field.name], $event)"
      />
      <FormCheckbox
        v-else-if="field.type === 'checkbox'"
        :model-value="internalData[field.name]"
        :label="field.label"
        :name="field.name"
        :options="field.options"
        :required="field.required"
        :helptext="field.helptext"
        @update:model-value="onUpdate([field.name], $event)"
      />
      <div v-else-if="field.type === 'hidden'" class="hidden">
        <FormInput
          :model-value="internalData[field.name]"
          :label="field.label"
          :autocomplete="field.autocomplete"
          :name="field.name"
          :disabled="field.disabled"
          :type="field.type"
          :required="field.required"
          :placeholder="field.placeholder"
          :helptext="field.helptext"
          @update:model-value="onUpdate([field.name], $event)"
        />
      </div>
      <FormInput
        v-else
        :model-value="internalData[field.name]"
        :label="field.label"
        :autocomplete="field.autocomplete"
        :name="field.name"
        :disabled="field.disabled"
        :type="field.type"
        :required="field.required"
        :placeholder="field.placeholder"
        :helptext="field.helptext"
        @update:model-value="onUpdate([field.name], $event)"
      />
      <p
        v-for="error in getError([field.name])"
        :key="error"
        class="text-red-700 text-sm leading-tight ml-1.5 mt-1 whitespace-pre-line"
      >
        {{ error }}
      </p>
    </div>
  </template>
</template>
