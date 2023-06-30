<script setup lang="ts">
import { ref } from "vue";
import FormSelect from "../components/FormSelect.vue";

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
      <FormSelect
        v-model="peop"
        :options="people"
        label="Person"
        name="person"
        :required="false"
        helptext="test"
      />
    </div>
    <div>selected: {{ peop }}</div>
  </div>
</template>
