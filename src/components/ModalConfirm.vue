<template>
  <ModalFree
    :model-value="modelValue"
    :title="title"
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
        {{ submit }}
      </ButtonNormal>
    </div>
  </ModalFree>
</template>

<script lang="ts">
import { RequestFunction } from "../types/shared";
import { defineComponent, PropType } from "vue";
import ButtonNormal from "./ButtonNormal.vue";
import ModalFree from "./ModalFree.vue";
import { ICommandError } from "../types";

export default defineComponent({
  components: {
    ModalFree,
    ButtonNormal,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: "Titel",
    },
    data: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Object as PropType<{ [key: string]: any } | null>,
      required: false,
      default: () => null,
    },
    modelValue: {
      type: Boolean,
      required: false,
      default: false,
    },
    request: {
      type: Function as PropType<RequestFunction>,
      required: false,
      default: null,
    },
    submit: {
      type: String,
      default: "Confirm",
    },
  },
  emits: ["update:modelValue", "success", "error"],
  data: function () {
    return {
      loading: false,
      error: null as string | null,
    };
  },
  methods: {
    submitClicked() {
      this.loading = true;
      const request = this.data
        ? () => this.request(this.data)
        : () => this.request();
      request()
        .then(() => this.$emit("success", this.data))
        .catch(this.handleError)
        .finally(() => {
          this.loading = false;
        });
    },
    handleError(error: ICommandError): Promise<void> {
      if (
        Object.keys(error.paramErrors).length === 0 &&
        error.generalErrors.length === 0 &&
        error.title &&
        error.title !== "" &&
        !error.title.includes("Unknown")
      ) {
        this.error = error.title;
        this.loading = false;
        this.$emit("error", error);
        return Promise.resolve();
      }
      this.error = "Unknown Error";
      this.loading = false;
      this.$emit("error", error);
      return Promise.reject(error);
    },
  },
});
</script>
