<script setup lang="ts">
import { useStore } from "@/store/index.ts";
const store = useStore();
</script>
<template>
  <button @click="store.counter++">changeCount</button>{{ store.counter }}
</template>
<style lang="scss"></style>
