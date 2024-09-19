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
      <FormFields
        :data="internalData"
        :fields="fields"
        :get-error="getError"
        :on-update="onUpdate"
      >
        <template v-for="(_, name) in $slots" #[name]="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </FormFields>
      <div class="flex items-center justify-end pt-2 print:hidden">
        <ButtonNormal v-if="submit" type="submit" :loading="loading">
          {{ submit }}
        </ButtonNormal>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import ButtonNormal from "@/components/ButtonNormal.vue";
import { ref, toRefs } from "vue";
import { RequestFunction } from "../types/shared";
import { FormField } from "../types/form";
import { ICommandError } from "../types/error";
import FormFields from "./FormFields.vue";
import { getNestedValue, setNestedValue } from "../utils/nested";

const props = withDefaults(
  defineProps<{
    fields: FormField[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: Record<string, any>;
    submit?: string;
    request: RequestFunction;
  }>(),
  {
    data: () => ({}),
    submit: "Submit",
  },
);
const { data, request, fields } = toRefs(props);

const emit = defineEmits(["success", "error", "change"]);

const generalErrors = ref<string[]>([]);
const errors = ref<ICommandError["paramErrors"]>({});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const internalData = ref<Record<string, any>>({});
const loading = ref<boolean>(false);

const onUpdate = (loc: string[], value: unknown): void => {
  setNestedValue(internalData.value, loc, value);
  emit("change", internalData.value);
};

const getError = (loc: (number | string)[]): string[] => {
  return getNestedValue(errors.value, loc);
};

internalData.value = Object.assign({}, data.value);

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
    .then((data) => handleSuccess(data))
    .catch((error) => handleError(error))
    .finally(() => {
      loading.value = false;
    });
};

const handleSuccess = (data) => {
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
  if (!!error.title && error.title !== "") {
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

defineExpose({
  data: internalData,
  internalData,
});
</script>
