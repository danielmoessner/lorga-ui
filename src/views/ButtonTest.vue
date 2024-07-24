<script setup lang="ts">
import ButtonNormal from "@/components/ButtonNormal.vue";
</script>

<template>
  <div class="p-10">
    <div class="flex flex-col gap-4 p-10 border">
      <ButtonNormal kind="primary" @click="null">
        Reorder Properties
      </ButtonNormal>
      <ButtonNormal kind="secondary" @click="null">
        Reorder Properties
      </ButtonNormal>
      <ButtonNormal kind="outline" @click="null">
        Reorder Properties
      </ButtonNormal>
      <ButtonNormal kind="action" @click="null">
        Reorder Properties
      </ButtonNormal>
      <ButtonNormal kind="delete" @click="null">
        Reorder Properties
      </ButtonNormal>
      <ButtonNormal kind="link" @click="null">Reorder Properties</ButtonNormal>
    </div>
  </div>
</template>
