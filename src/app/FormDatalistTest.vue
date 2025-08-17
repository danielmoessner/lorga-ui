<script setup lang="ts">
import FormDatalist from "../components/FormDatalist.vue";
import { ref } from "vue";

const names = [
  "Wade Cooper",
  "Arlene Mccoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
];

const peop = ref();
</script>

<template>
  <div class="p-20">
    <div>
      <FormDatalist
        v-model="peop"
        :options="names"
        label="Person"
        name="person"
        required
        helptext="test"
      />
    </div>
    <div>selected: {{ peop }}</div>
  </div>
</template>
