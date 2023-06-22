<template>
  <label :for="id" class="relative block">
    <div>
      <FormLabel :required="required" :label="label" />
    </div>
    <div class="flex items-center space-x-2" :class="{ 'mt-1': !!label }">
      <div class="relative w-full">
        <input
          :id="id"
          ref="input"
          v-model="model"
          :type="type"
          :placeholder="placeholder"
          :step="step"
          :min="min"
          :required="required"
          :disabled="disabled"
          :autocomplete="autocomplete"
          class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus-within:ring-1 focus-within:ring-formcolor focus-within:border-formcolor focus:ring-formcolor focus:border-formcolor sm:text-sm"
          :class="{
            'opacity-50 bg-gray-100 pointer-events-none': disabled,
          }"
          @focusout="focusoutHandler"
        />
      </div>
    </div>
    <FormHelptext :helptext="helptext" />
  </label>
</template>

<script lang="ts" setup>
import FormLabel from "./FormLabel.vue";
import FormHelptext from "./FormHelptext.vue";
import { computed, ref, toRefs } from "vue";

const props = defineProps({
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
    type: [String, Number],
  },
  type: {
    default: "text",
    type: String,
    required: false,
  },
  placeholder: {
    required: false,
    default: null,
    type: String,
  },
  step: {
    required: false,
    default: null,
    type: Number,
  },
  min: {
    required: false,
    default: null,
    type: Number,
  },
  required: {
    required: false,
    default: false,
    type: Boolean,
  },
  name: {
    required: true,
    type: String,
  },
  disabled: {
    required: false,
    default: false,
    type: Boolean,
  },
  autocomplete: {
    required: false,
    default: null,
    type: String,
  },
});

const { modelValue, name } = toRefs(props);

const id = computed(() => `form-input-${name.value}`);

const input = ref<HTMLInputElement | null>(null);

const emit = defineEmits(["update:modelValue", "change:modelValue"]);

const model = computed({
  get: () => {
    return modelValue.value;
  },
  set: (v) => {
    emit("update:modelValue", v);
  },
});

// emit change
const focusoutHandler = () => {
  emitChange();
};

/*
the event change:modelValue is supposed to be triggered as soon as 
the user is finished typing. obviously in reality it is not possible to know when this is.
therefore this component emits this event when the focus or the route 
changes and the value of the input is not in sync with the modelvalue prop.
*/
const emitChange = () => {
  if (input.value === null) return;
  const value = input.value.value;
  if (value !== model.value) emit("change:modelValue", value);
};
</script>
