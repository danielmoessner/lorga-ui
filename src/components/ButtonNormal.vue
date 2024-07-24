<template>
  <div :class="{ 'inline-block': kind === 'action' || kind === 'delete' }">
    <component
      :is="is"
      :class="[baseClasses, kindColorClasses, kindSizeClasses, moreClasses]"
      v-bind="attrs"
      @click="emitClick()"
    >
      <Loader v-show="loading" color="text-white" class="mr-2" />
      <slot />
    </component>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from "vue";
import Loader from "./CircleLoader.vue";
import { useConfig } from "@/config";

const props = withDefaults(
  defineProps<{
    to?: string | object | null;
    id?: string;
    href?: string;
    type?: string;
    loading?: boolean;
    disabled?: boolean;
    kind?: "primary" | "secondary" | "action" | "delete" | "link" | "outline";
  }>(),
  {
    to: null,
    id: undefined,
    href: undefined,
    type: "button",
    loading: false,
    disabled: false,
    kind: "primary",
  },
);
const { to, href, type, id, disabled, loading } = toRefs(props);

const emit = defineEmits(["click"]);

const is = computed(() => {
  if (to.value) {
    return "router-link";
  } else if (href.value) {
    return "a";
  } else if (type.value) {
    return "button";
  }
  return "div";
});

const attrs = computed(() => {
  let attrs = {} as { [key: string]: any };  // eslint-disable-line
  if (type.value && is.value === "button") {
    attrs["type"] = type.value;
    attrs["disabled"] = disabledComputed.value;
  } else if (is.value === "router-link") {
    attrs["to"] = to.value;
  } else if (is.value === "a") {
    attrs["href"] = href.value;
  }
  if (id.value) attrs["id"] = id.value;
  return attrs;
});

const disabledComputed = computed(() => {
  if (loading.value || disabled.value) return true;
  return false;
});

const baseClasses =
  "cursor-pointer inline-flex items-center focus:outline-none transition duration-100";

const { config } = useConfig();

const kindColorClasses = computed(() => {
  return config.button[props.kind].color;
});

const kindSizeClasses = computed(() => {
  return config.button[props.kind].size;
});

const moreClasses = computed(() => {
  let moreClasses = "";

  if (disabledComputed.value) moreClasses += config.button.disabled;

  return moreClasses;
});

const emitClick = () => {
  emit("click");
};
</script>
