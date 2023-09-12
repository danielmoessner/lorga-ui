<script setup lang="ts">
import { FormField } from "../types/form";
import FormFields from "./FormFields.vue";
import { computed, toRefs } from "vue";
import { cloneDeep } from "lodash";
import ButtonNormal from "./ButtonNormal.vue";
import { setNestedValue } from "../utils/nested";

const props = withDefaults(
  defineProps<{
    name: string;
    addButtonText?: string;
    removeButtonText?: string;
    fields: FormField[];
    defaultAmount?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any> | undefined; // read-only?
    // eslint-disable-next-line no-unused-vars
    getError: (loc: string[]) => string[];
    // eslint-disable-next-line no-unused-vars
    onUpdate: (loc: string[], value: unknown) => void;
  }>(),
  { addButtonText: "Add", removeButtonText: "Remove", defaultAmount: 1 },
);
const { onUpdate, data, name, getError, defaultAmount } = toRefs(props);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const internalData = computed<Record<string, any>[]>(() => {
  if (!data.value || !Array.isArray(data.value)) return [];
  return data.value;
});

const add = () => {
  const data = cloneDeep(internalData.value);
  data.push({});
  return onUpdate.value([name.value], data);
};

const remove = () => {
  const data = cloneDeep(internalData.value);
  data.pop();
  return onUpdate.value([name.value], data);
};

const adds = defaultAmount.value - internalData.value.length;
// call add adds times:
for (let i = 0; i < adds; i++) {
  add();
}

const internalOnUpdate = (index: number) => {
  return (loc: string[], value: unknown) => {
    const data = cloneDeep(internalData.value);
    const objValue = data[index];
    setNestedValue(objValue, loc, value);
    data[index] = objValue;
    return onUpdate.value([name.value], data);
  };
};

const internalGetError = (index: number) => {
  return (loc: string[]): string[] => {
    const newLoc = [name.value, index.toString(), ...loc];
    return getError.value(newLoc);
  };
};
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <template v-for="(i, index) in internalData" :key="index">
      <FormFields
        :data="i"
        :on-update="internalOnUpdate(index)"
        :fields="fields"
        :get-error="internalGetError(index)"
      />
    </template>
    <div class="flex space-x-5">
      <ButtonNormal :id="`${name}-add-button`" kind="action" @click="add">
        {{ addButtonText }}
      </ButtonNormal>
      <ButtonNormal :id="`${name}-remove-button`" kind="action" @click="remove">
        {{ removeButtonText }}
      </ButtonNormal>
    </div>
  </div>
</template>
