<script setup lang="ts">
import FormList from "../components/FormList.vue";
import { ref } from "vue";

const peop = ref([]);
</script>

<template>
  <div class="p-20">
    <div>
      <FormList
        v-model="peop"
        label="Person"
        name="person"
        required
        helptext="test"
        :get-error="() => []"
      />
    </div>
    <div>selected: {{ peop }}</div>
  </div>
</template>
