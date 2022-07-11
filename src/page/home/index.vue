<script setup lang="ts"></script>

<template>
  <div class="home-container">
    <p align="center">
      <img
        width="300"
        src="https://assets.fedtop.com/picbed/logo.png"
        alt="Vue logo"
      />
    </p>
    <h1>
      Vue Super 👉
      <a href="https://github.com/wangrongding" target="_blank">仓库</a>
    </h1>
    <router-link to="/testing" style="margin: 0 auto">go go go!</router-link>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  text-align: center;

  h1 {
    color: $-text-color;
    background-color: #34495e;

    a {
      color: $-text-color;
    }
  }
}
</style>
