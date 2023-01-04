<script setup lang="ts">
// import { reactive } from "vue";

const state = reactive({})
</script>
<template>
  <div class="login-background-container"></div>
</template>
<style lang="scss" scoped>
.login-background-container {
  height: 100vh;
  background: url('@/assets/wallpaper.png'),
    linear-gradient(
      // to right,
      120deg,
      #0fffc7,
      // #022901,
      #34495e,
      $base-navbar-bg-color,
      // #03102b,
      $base-app-container-bg-color
    );
  background-repeat: no-repeat;
  background-position: center left;
  background-size: contain;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
