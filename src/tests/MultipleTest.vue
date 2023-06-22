<script setup lang="ts">
import FormMultiple from "../components/FormMultiple.vue";
import { ref } from "vue";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

const peop = ref();
</script>

<template>
  <div class="p-20">
    <div>
      <FormMultiple
        v-model="peop"
        :options="people"
        label="Person"
        name="person"
        required
        helptext="test"
      />
    </div>
    <div>selected: {{ peop }}</div>
  </div>
</template>
