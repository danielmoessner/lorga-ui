<template>
  <ModalFree
    :model-value="modelValue"
    :title="internalTitle"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="mt-2">
      <p class="text-sm text-gray-500 break-words">
        <slot>Are you sure you want to delete '{{ internalObjName }}'?</slot>
      </p>
      <p v-if="error" class="mt-2 text-sm text-red-600 whitespace-pre-line">
        {{ error }}
      </p>
    </div>
    <div class="flex justify-end mt-4 space-x-3">
      <ButtonNormal
        kind="secondary"
        type="button"
        @click="$emit('update:modelValue', false)"
      >
        Cancel
      </ButtonNormal>
      <ButtonNormal type="button" :loading="loading" @click="deleteClicked()">
        Yes, delete
      </ButtonNormal>
    </div>
  </ModalFree>
</template>

<script setup lang="ts">
import ModalFree from "./ModalFree.vue";
import ButtonNormal from "./ButtonNormal.vue";
import { RequestFunction } from "../types/shared";
import { ICommandError } from "../types";
import { computed, ref, toRefs, watch } from "vue";

const props = defineProps<{
  title?: string;
  objName?: string;
  data: Record<string, string | number | boolean>;
  modelValue: boolean;
  request: RequestFunction;
}>();

const { modelValue, request, data } = toRefs(props);

const internalObjName = computed(
  () => props.objName || props.data.name || "this data",
);
const internalTitle = computed(() => props.title || "Delete");

const emit = defineEmits(["update:modelValue", "deleted", "error"]);

const loading = ref(false);
const error = ref<string | null>(null);

watch(modelValue, (newValue) => {
  if (newValue) error.value = null;
});

function deleteClicked() {
  loading.value = true;
  error.value = null;
  request
    .value(data.value)
    .then(() => emit("deleted", data.value))
    .finally(() => (loading.value = false))
    .catch(handleError);
}

function handleError(ce: ICommandError): Promise<void> {
  if (
    Object.keys(ce.paramErrors).length === 0 &&
    ce.generalErrors.length === 0 &&
    ce.title &&
    ce.title !== "" &&
    !ce.title.includes("Unknown")
  ) {
    error.value = ce.title;
    emit("error", ce);
    return Promise.resolve();
  }
  error.value = "Unknown Error";
  emit("error", ce);
  return Promise.reject(ce);
}
</script>
