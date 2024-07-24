<template>
  <ModalFree
    :model-value="modelValue"
    :title="title"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <FormGenerator
      :fields="fields"
      :data="data"
      :request="request"
      :submit="submit ? submit : 'Save'"
      @success="emit('success', $event)"
      @change="emit('change', $event)"
      @error="emit('error', $event)"
    >
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </FormGenerator>
  </ModalFree>
</template>

<script lang="ts" setup>
import ModalFree from "./ModalFree.vue";
import FormGenerator from "./FormGenerator.vue";
import { ref, toRefs, watch } from "vue";
import { RequestFunction } from "../types/shared";
import { FormField } from "../types/form";

const props = defineProps<{
  title: string;
  modelValue: boolean;
  fields: FormField[];
  data?: Record<string, unknown>;
  submit?: string;
  request: RequestFunction;
}>();
const { modelValue } = toRefs(props);

const emit = defineEmits(["update:modelValue", "success", "change", "error"]);

const disabled = ref(false);

watch(modelValue, (newValue) => {
  if (newValue) disabled.value = false;
  else disabled.value = true;
});
</script>
