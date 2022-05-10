<script setup lang="ts">
const state = reactive({
  count: 0,
});
</script>

<template>
  <div>
    <h1>Vue Boot</h1>
    <div>{{ state.count }}</div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  color: $-text-color;
  text-align: center;
  background-color: #c3c3c3;
}
</style>
