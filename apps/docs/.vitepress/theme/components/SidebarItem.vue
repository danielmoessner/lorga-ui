<script setup lang="ts">
import { computed, toRefs } from "vue";
import type { PropType } from "vue";
import { useRoute } from "vitepress";

interface SidebarItem {
  text: string;
  link?: string;
  items?: SidebarItem[];
}

const props = defineProps({
  item: {
    type: Object as PropType<SidebarItem>,
    required: true,
  },
  depth: {
    type: Number,
    required: false,
    default: 0,
  },
});

const { item, depth } = toRefs(props);

const route = useRoute();

const checkActive = (i: SidebarItem) => {
  if (i.link && route.path.includes(i.link)) return true;
  if (i.items && i.items.some(checkActive)) return true;
  return false;
};

const isActive = computed(() => checkActive(item.value));

const itemClass = computed(() => ({
  "border-transparent border-l-4 w-full block text-gray-500": true,
  "px-4 text-lg font-bold mb-3": depth.value === 0,
  "px-6 text-base tracking-wide py-1": depth.value === 1,
  "px-10 tracking-wide py-0.5 text-sm": depth.value === 2,
  "px-14 tracking-wide text-xs": depth.value === 3,
  "font-medium border-gray-600": isActive.value && depth.value === 1,
  "font-medium": isActive.value && (depth.value === 2 || depth.value === 3),
  "text-gray-800": isActive.value,
}));
</script>

<template>
  <li>
    <a v-if="item.link" :class="itemClass" :href="item.link">
      {{ item.text }}
    </a>
    <p v-else :class="itemClass">
      {{ item.text }}
    </p>

    <ul v-if="item.items?.length" class="space-y-1">
      <SidebarItem
        v-for="child in item.items"
        :key="`${depth}${child.text}${child.link}`"
        :item="child"
        :depth="depth + 1"
      />
    </ul>
  </li>
</template>
