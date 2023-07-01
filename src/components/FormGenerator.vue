<template>
  <form ref="form" novalidate @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 gap-4">
      <div v-if="generalErrors && generalErrors.length">
        <p
          v-for="(error, index) in generalErrors"
          :key="index"
          class="mt-2 text-sm leading-tight text-red-700"
        >
          {{ error }}
        </p>
      </div>
      <FormFields v-model="internalData" :fields="fields" :errors="errors">
        <template v-for="(_, name) in $slots" #[name]="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </FormFields>
      <slot name="bottom" />
      <div class="flex items-center justify-end pt-2 print:hidden">
        <ButtonBlue
          v-if="submit"
          type="submit"
          :disabled="disabled"
          :loading="loading"
        >
          {{ submit }}
        </ButtonBlue>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import ButtonBlue from "./ButtonNormal.vue";
import { onMounted, ref, toRefs, watch } from "vue";
import { RequestFunction } from "../types/shared";
import { FormField } from "../types/form";
import { ICommandError } from "../types/error";
import FormFields from "./FormFields.vue";

const props = withDefaults(
  defineProps<{
    fields: FormField[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: Record<string, any>;
    submit?: string;
    disabled?: boolean;
    request: RequestFunction;
  }>(),
  {
    data: () => ({}),
    disabled: false,
    submit: "Submit",
  },
);
const { data, request, fields } = toRefs(props);

const emit = defineEmits(["success", "error", "cancel", "change"]);

const generalErrors = ref<string[]>([]);
const errors = ref<Record<string, string[]>>({});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const internalData = ref<Record<string, any>>({});
const loading = ref<boolean>(false);

onMounted(() => {
  if (data?.value) internalData.value = Object.assign({}, data.value);
});

watch(
  internalData,
  (newValue) => {
    emit("change", newValue);
  },
  { deep: true },
);

const handleSubmit = () => {
  loading.value = true;
  sendRequest(internalData.value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendRequest = (requestData: Record<string, any>) => {
  errors.value = {};
  generalErrors.value = [];

  request
    .value(requestData)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((data: Record<string, any>) => handleSuccess(data))
    .catch((error) => handleError(error))
    .finally(() => {
      loading.value = false;
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleSuccess = (data: Record<string, any>) => {
  emit("success", data);
};

const hasVisibleErrors = (
  generalErrors: ICommandError["generalErrors"],
  errors: ICommandError["paramErrors"],
): boolean => {
  const hasGeneralErrors = !!generalErrors && !!generalErrors.length;

  const hasVisibleFieldErrors =
    !!errors &&
    fields.value
      .filter((f) => f.type !== "hidden")
      .some((f) => f.name in errors);

  return hasGeneralErrors || hasVisibleFieldErrors;
};

const handleError = (error: ICommandError): Promise<void> => {
  if (!!error.title && error.title !== "" && !error.title.includes("Unknown")) {
    errors.value = error.paramErrors || {};
    generalErrors.value = error.generalErrors || [];
    if (!hasVisibleErrors(generalErrors.value, errors.value))
      generalErrors.value = [error.title];
    emit("error", error);
    return Promise.resolve();
  }

  generalErrors.value = ["Unknown Error"];
  emit("error", error);
  return Promise.reject(error);
};
</script>
