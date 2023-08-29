<template>
  <ModalFree
    :model-value="modelValue"
    :title="title"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <FormGenerator
      ref="form"
      :fields="fields"
      :data="data"
      :request="request"
      :submit="submit"
      :cancel="cancel"
      :disabled="disabled"
      @success="emit('success', $event)"
      @cancel="emit('update:modelValue', false)"
      @change="emit('change', $event)"
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
import { PropType, ref, toRefs, watch } from "vue";
import { RequestFunction } from "../types/shared";
import { FormField } from "../types/form";

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "",
  },
  modelValue: {
    type: Boolean,
    required: false,
    default: false,
  },
  fields: {
    type: Array as PropType<FormField[]>,
    required: true,
  },
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: Object as PropType<Record<string, any>>,
    default: null,
    required: false,
  },
  submit: {
    type: String,
    required: false,
    default: "Save",
  },
  cancel: {
    type: String,
    required: false,
    default: null,
  },
  request: {
    type: Function as PropType<RequestFunction>,
    required: false,
    default: null,
  },
});

const { modelValue, data } = toRefs(props);
const emit = defineEmits(["update:modelValue", "success", "change"]);

const disabled = ref<boolean>(false);
const form = ref<typeof FormGenerator>();

watch(modelValue, (newValue) => {
  if (newValue) disabled.value = false;
  else disabled.value = true;
});

defineExpose({
  form,
});
</script>
