<script setup lang="ts">
import FormCombobox from "../components/FormCombobox.vue";
import { ref } from "vue";

const data = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Hellen Fox" },
  { id: 8, name: "Hellen Cox" },
];

const people = ref();

setTimeout(() => {
  people.value = data;
}, 1000);

const selected = ref();
</script>

<template>
  <div class="p-20">
    <div>
      <FormCombobox
        v-model="selected"
        :options="people"
        label="Person"
        name="person"
        required
        helptext="test"
      />
    </div>
    <div>selected: {{ selected }}</div>
  </div>
</template>
