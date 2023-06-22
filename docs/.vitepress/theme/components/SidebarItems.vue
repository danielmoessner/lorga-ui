<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue";
import { useData } from "vitepress";

const data = useData();
const sidebarItems = data.theme.value.sidebar;
</script>

<template>
  <ul v-if="sidebarItems.length" class="space-y-10">
    <SidebarItem
      v-for="item in sidebarItems"
      :key="item.link || item.text"
      :item="item"
    />
  </ul>
</template>
