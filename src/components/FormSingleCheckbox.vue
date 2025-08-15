<template>
  <div class="relative block">
    <div class="flex items-center space-x-2" :class="{ 'mt-1': !!label }">
      <label class="relative flex items-center leading-3">
        <input
          v-model="model"
          type="checkbox"
          :name="name"
          class="w-4 h-4 border border-gray-300 rounded appearance-none checked:bg-formcolor text-formcolor focus:ring-2 focus:ring-offset-1 focus:ring-formcolor checked:border-formcolor"
        />
        <span class="ml-2">{{ label }}</span>
      </label>
    </div>
    <FormHelptext :helptext="helptext" />
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from "vue";
import FormHelptext from "./FormHelptext.vue";

const props = defineProps<{
  label: string;
  name: string;
  helptext?: string;
  modelValue?: boolean;
}>();
const { modelValue } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

const model = computed<boolean>({
  get: () => modelValue.value,
  set: (value: boolean) => emit("update:modelValue", value),
});
</script>

<style scoped>
input[type="checkbox"]:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  background-color: currentColor;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
