<script setup lang="ts">
// import { useThemeData } from "../../../../node_modules/@vuepress/plugin-theme-data/lib/client/composables/useThemeData.js";
import SidebarMain from "../components/SidebarMain.vue";
import { useData } from "vitepress";

const data = useData();
</script>

<template>
  <nav class="fixed z-10 flex items-center w-full h-12 px-6 bg-white border-b">
    <a class="text-2xl font-bold" href="/">
      {{ data.theme.value.title }}
    </a>
  </nav>
  <main class="flex">
    <SidebarMain />
    <article class="w-full pt-12 pb-32 pl-72">
      <div class="px-6 py-10 mx-auto prose dark:prose-invert vp-doc">
        <Content />
      </div>
    </article>
  </main>
</template>
