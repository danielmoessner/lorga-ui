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
      <div
        v-for="field in fields"
        :key="field.name"
        :class="{ hidden: field.type === 'hidden' }"
      >
        <FormTextarea
          v-if="field.type === 'textarea'"
          v-model="internalData[field.name]"
          :label="field.label"
          :name="field.name"
          :type="field.type"
          :required="field.required"
          :placeholder="field.placeholder"
        />
        <template v-else-if="field.type === 'custom'">
          <slot name="custom" :data="internalData" />
        </template>
        <FormSelect
          v-else-if="field.type === 'select'"
          v-model="internalData[field.name]"
          :label="field.label"
          :name="field.name"
          :required="field.required"
          :options="field.options"
          :helptext="field.helptext"
        />
        <FormMultiple
          v-else-if="field.type === 'multiple'"
          v-model="internalData[field.name]"
          :label="field.label"
          :name="field.name"
          :required="field.required"
          :options="field.options"
          :helptext="field.helptext"
        />
        <FormList
          v-else-if="field.type === 'list'"
          v-model="internalData[field.name]"
          :required="field.required"
          :label="field.label"
          :helptext="field.helptext"
          :name="field.name"
        />
        <FormToggle
          v-else-if="field.type === 'toggle'"
          v-model="internalData[field.name]"
          :label="field.label"
          :name="field.name"
          :helptext="field.helptext"
        />
        <FormFile
          v-else-if="field.type === 'file'"
          v-model="internalData[field.name]"
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
          v-model="internalData[field.name]"
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
          v-model="internalData[field.name]"
          :label="field.label"
          :name="field.name"
          :options="field.options"
          :required="field.required"
          :helptext="field.helptext"
        />
        <FormCheckbox
          v-else-if="field.type === 'checkbox'"
          v-model="internalData[field.name]"
          :label="field.label"
          :name="field.name"
          :options="field.options"
          :required="field.required"
          :helptext="field.helptext"
        />
        <FormInput
          v-else
          v-model="internalData[field.name]"
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
          v-if="errors[field.name]"
          class="text-red-700 text-sm leading-tight ml-1.5 mt-1 whitespace-pre-line"
        >
          {{ errors[field.name][0] }}
        </p>
      </div>
      <slot name="bottom" />
      <div class="flex items-center justify-end pt-2 print:hidden">
        <ButtonBlue
          v-if="cancel"
          class="mr-3"
          kind="secondary"
          type="button"
          @click="$emit('cancel')"
        >
          {{ cancel }}
        </ButtonBlue>
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

<script lang="ts">
import FormTextarea from "./FormTextarea.vue";
import FormSelect from "./FormSelect.vue";
import FormMultiple from "./FormMultiple.vue";
import FormInput from "./FormInput.vue";
import ButtonBlue from "./ButtonNormal.vue";
import { defineComponent, PropType } from "vue";
import { JsonModel, RequestFunction } from "../types/shared";
import FormList from "./FormList.vue";
import FormToggle from "./FormToggle.vue";
import FormFile from "./FormFile.vue";
import { FormField } from "../types/form";
import FormCombobox from "./FormCombobox.vue";
import FormCheckbox from "./FormCheckbox.vue";
import FormFiles from "./FormFiles.vue";
import { ICommandError } from "../types/error";

export default defineComponent({
  components: {
    FormToggle,
    ButtonBlue,
    FormSelect,
    FormCheckbox,
    FormInput,
    FormTextarea,
    FormMultiple,
    FormList,
    FormFile,
    FormCombobox,
    FormFiles,
  },
  props: {
    fields: {
      type: Array as PropType<FormField[]>,
      required: true,
    },
    data: {
      type: Object as PropType<JsonModel | null>,
      default: null,
      required: false,
    },
    submit: {
      type: String,
      required: false,
      default: "Send" as string,
    },
    cancel: {
      type: String,
      required: false,
      default: "",
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    request: {
      type: Function as PropType<RequestFunction>,
      required: false,
      default: null,
    },
  },
  emits: ["success", "error", "cancel", "change"],
  data() {
    return {
      generalErrors: [] as string[],
      errors: {} as { [key: string]: string[] },
      internalData: {} as JsonModel,
      loading: false,
    };
  },
  watch: {
    data: function (newValue) {
      this.internalData = Object.assign({}, this.internalData, newValue);
    },
    internalData: {
      deep: true,
      handler(newValue) {
        this.$emit("change", newValue);
      },
    },
  },
  mounted() {
    this.internalData = Object.assign({}, this.data);
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      this.sendRequest(this.internalData);
    },
    sendRequest(requestData: JsonModel) {
      this.errors = {};
      this.generalErrors = [];

      this.request(requestData)
        .then((data: JsonModel) => this.handleSuccess(data))
        .catch((error) => this.handleError(error))
        .finally(() => {
          this.loading = false;
        });
    },
    handleSuccess(data: JsonModel) {
      this.$emit("success", data);
    },
    hasVisibleErrors(
      generalErrors: ICommandError["generalErrors"],
      errors: ICommandError["paramErrors"],
    ): boolean {
      const hasGeneralErrors = !!generalErrors && !!generalErrors.length;

      const hasVisibleFieldErrors =
        !!errors &&
        this.fields
          .filter((f) => f.type !== "hidden")
          .some((f) => f.name in errors);

      return hasGeneralErrors || hasVisibleFieldErrors;
    },
    handleError(error: ICommandError): Promise<void> {
      if (
        !!error.title &&
        error.title !== "" &&
        !error.title.includes("Unknown")
      ) {
        this.errors = error.paramErrors || {};
        this.generalErrors = error.generalErrors || [];
        if (!this.hasVisibleErrors(this.generalErrors, this.errors))
          this.generalErrors = [error.title];
        this.$emit("error", error);
        return Promise.resolve();
      }

      this.generalErrors = ["Unknown Error"];
      this.$emit("error", error);
      return Promise.reject(error);
    },
  },
});
</script>
