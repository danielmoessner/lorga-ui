<template>
  <ModalFree
    :model-value="modelValue"
    :title="title"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="mt-2">
      <p class="text-sm text-gray-500 break-words">
        <slot>
          Are you sure you want to {{ verb }}
          {{ data ? data.name : "this data" }}?
        </slot>
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
        Yes, {{ verb }}
      </ButtonNormal>
    </div>
  </ModalFree>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ModalFree from "./ModalFree.vue";
import ButtonNormal from "./ButtonNormal.vue";
import { RequestFunction } from "../types/shared";
import { ICommandError } from "../types";

export default defineComponent({
  components: {
    ButtonNormal,
    ModalFree,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: "Delete",
    },
    data: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Object as PropType<Record<string, any>>,
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
    verb: {
      type: String,
      default: "delete",
    },
  },
  emits: ["update:modelValue", "deleted", "error"],
  data: function () {
    return {
      loading: false,
      error: null as string | null,
    };
  },
  watch: {
    modelValue(newValue) {
      if (newValue) this.error = null;
    },
  },
  methods: {
    deleteClicked() {
      this.loading = true;
      this.error = null;
      this.request(this.data)
        .then(() => this.$emit("deleted", this.data))
        .finally(() => (this.loading = false))
        .catch(this.handleError);
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
        this.$emit("error", error);
        return Promise.resolve();
      }
      this.error = "Unknown Error";
      this.$emit("error", error);
      return Promise.reject(error);
    },
  },
});
</script>
