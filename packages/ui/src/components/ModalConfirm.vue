<script lang="ts" setup>
import { RequestFunction } from "../types/shared";
import { ref, toRefs } from "vue";
import ButtonNormal from "./ButtonNormal.vue";
import ModalFree from "./ModalFree.vue";
import { ICommandError } from "../types";

const props = defineProps<{
  title?: string;
  data?: { [key: string]: unknown };
  modelValue: boolean;
  request: RequestFunction;
  submit?: string;
}>();
const { data, request } = toRefs(props);

const emit = defineEmits(["update:modelValue", "success", "error"]);

const loading = ref(false);
const error = ref<string | null>(null);

function submitClicked() {
  loading.value = true;
  error.value = null;
  const r = data.value
    ? () => request.value(data.value)
    : () => request.value();
  r()
    .then(() => emit("success", data.value))
    .catch(handleError)
    .finally(() => {
      loading.value = false;
    });
}

function handleError(e: ICommandError): Promise<void> {
  if (
    Object.keys(e.paramErrors).length === 0 &&
    e.generalErrors.length === 0 &&
    e.title &&
    e.title !== "" &&
    !e.title.includes("Unknown")
  ) {
    error.value = e.title;
    loading.value = false;
    emit("error", e);
    return Promise.resolve();
  }
  error.value = "Unknown Error";
  loading.value = false;
  emit("error", e);
  return Promise.reject(e);
}
</script>

<template>
  <ModalFree
    :model-value="modelValue"
    :title="title || 'Confirm'"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="mt-2">
      <p class="text-sm text-gray-500">
        <slot />
      </p>
      <p v-if="error" class="mt-2 text-sm text-red-600 whitespace-pre-line">
        {{ error }}
      </p>
    </div>

    <div class="flex justify-end mt-4">
      <ButtonNormal type="button" :loading="loading" @click="submitClicked()">
        {{ submit || "Confirm" }}
      </ButtonNormal>
    </div>
  </ModalFree>
</template>
