<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" @close="$emit('update:modelValue', false)">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-gray-800/40" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="relative inline-block w-full p-6 my-8 text-left align-middle transition-all transform bg-white rounded-md shadow-xl"
              :class="[width]"
            >
              <div class="absolute top-0 right-0 block pt-3 pr-3">
                <button
                  type="button"
                  class="bg-white p-0.5 border-2 border-transparent rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 hover:border-gray-100 focus:outline-none focus:ring-0"
                  @click="$emit('update:modelValue', false)"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
              <DialogTitle
                as="h2"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ title }}
              </DialogTitle>
              <div class="mt-5">
                <slot />
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

export default defineComponent({
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    XMarkIcon,
    DialogOverlay,
    DialogTitle,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: false,
      default: false,
    },
    width: {
      type: String,
      default: "max-w-md",
    },
  },
  emits: ["update:modelValue"],
});
</script>
