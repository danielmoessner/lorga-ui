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

const kindColorClasses = computed(() => {
  if (props.kind === "primary") {
    return "border shadow-sm border-transparent text-white bg-formcolor bg-opacity-100 hover:bg-opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-formcolor";
  } else if (props.kind === "secondary") {
    return "border shadow-sm border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200";
  } else if (props.kind === "outline") {
    return "border shadow-sm border-indigo-600 text-indigo-500 bg-transparent hover:bg-indigo-500 hover:text-indigo-50 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  } else if (props.kind === "action") {
    return "border border-transparent text-blue-700 hover:text-blue-900 hover:bg-blue-50 focus:border-blue-200";
  } else if (props.kind === "delete") {
    return "border border-transparent text-red-600 hover:text-red-700 hover:bg-red-50 focus:border-red-200";
  } else if (props.kind === "link") {
    return "underline text-formcolor hover:text-opacity-75 focus:ring-0";
  }
  return "";
});

const kindSizeClasses = computed(() => {
  if (props.kind === "action" || props.kind === "delete") {
    return "px-2 py-0.5 text-sm font-medium rounded-md -mx-2 hover:z-10 hover:relative";
  } else if (props.kind === "link") {
    return "";
  } else if (
    props.kind === "primary" ||
    props.kind === "secondary" ||
    props.kind === "outline"
  ) {
    return "px-4 py-2 text-sm font-medium rounded-xl";
  }
  return "";
});

const moreClasses = computed(() => {
  let moreClasses = "";

  if (disabledComputed.value)
    moreClasses += "pointer-events-none opacity-80 cursor-not-allowed";

  return moreClasses;
});

const emitClick = () => {
  emit("click");
};
</script>
