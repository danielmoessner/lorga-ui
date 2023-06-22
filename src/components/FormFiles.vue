<template>
  <label :for="id" class="relative block">
    <div>
      <FormLabel :required="required" :label="label" />
    </div>
    <div class="flex flex-col space-y-2" :class="{ 'mt-1': !!label }">
      <div class="relative w-full">
        <div
          class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-1 focus-within:ring-1 focus-within:ring-formcolor focus-within:border-formcolor focus:ring-formcolor focus:border-formcolor sm:text-sm"
          :class="{
            'opacity-50 bg-gray-100 pointer-events-none': disabled,
            'outline-none ring-1 ring-blue-800 border-blue-800': focus,
          }"
        >
          <div class="flex justify-between">
            <div v-if="model" class="truncate">
              <template v-if="Array.isArray(model)">
                {{ model.map((f) => f.name).join(", ") }}
              </template>
              <template v-else>
                {{ model }}
              </template>
            </div>
            <div v-else class="text-gray-500 group-hover:text-gray-800">
              Choose files
            </div>
            <div class="flex space-x-3">
              <slot />
            </div>
          </div>

          <input
            :id="id"
            :model-value="model"
            multiple
            class="sr-only"
            name="file"
            type="file"
            :required="false"
            :disabled="disabled"
            @focusin="focus = true"
            @focusout="focus = false"
            @input="changeHandler($event)"
          />
        </div>
      </div>
      <div
        class="flex items-center justify-center px-5 py-4 text-gray-500 border border-gray-400 border-dashed rounded-md"
        :class="{ 'border-gray-600 text-gray-700 bg-gray-50': dragCounter > 0 }"
        @drop.prevent="dropHandler($event)"
        @dragover.prevent=""
        @dragenter="dragEnterHandler()"
        @dragleave="dragLeaveHandler()"
      >
        <span class="block">or drop here</span>
      </div>
      <p
        v-if="showError"
        class="text-red-700 text-sm leading-tight ml-1.5 mt-1"
      >
        The data type seems to be wrong. Please make sure it's not a folder.
      </p>
    </div>
    <FormHelptext :helptext="helptext" />
  </label>
</template>

<script lang="ts">
import FormLabel from "./FormLabel.vue";
import FormHelptext from "./FormHelptext.vue";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: {
    FormHelptext,
    FormLabel,
  },
  props: {
    label: {
      required: true,
      type: String,
    },
    helptext: {
      required: false,
      default: "",
      type: String,
    },
    modelValue: {
      required: false,
      default: "",
      type: [String, Object] as PropType<File[]>,
    },
    name: {
      required: true,
      type: String,
    },
    required: {
      required: false,
      default: false,
      type: Boolean,
    },
    disabled: {
      required: false,
      default: false,
      type: Boolean,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      dragCounter: 0,
      showError: false,
      focus: false,
    };
  },
  computed: {
    model: {
      get(): File[] {
        return this.modelValue;
      },
      set() {
        // never happens
      },
    },
    id() {
      return `form-files-${this.name}`;
    },
  },
  methods: {
    changeHandler(event: Event) {
      const target = event.target as HTMLInputElement;
      this.update(target);
    },
    dropHandler(event: DragEvent) {
      this.dragCounter = 0;
      const data = event.dataTransfer;
      if (data) this.update(data);
    },
    dragEnterHandler() {
      this.showError = false;
      this.dragCounter += 1;
    },
    dragLeaveHandler() {
      this.dragCounter -= 1;
    },
    update(target: HTMLInputElement | DataTransfer) {
      if (target["files"] && target["files"].length > 0) {
        const files: File[] = [];
        for (const file of target["files"]) {
          files.push(file);
        }
        this.$emit("update:modelValue", files);
      } else this.$emit("update:modelValue", []);
    },
  },
});
</script>
