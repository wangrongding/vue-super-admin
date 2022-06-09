<script setup lang="ts"></script>

<template>
  <div class="page-container">
    <p align="center">
      <a
        href="https://github.com/wangrongding"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          width="300"
          src="https://assets.fedtop.com/picbed/logo.png"
          alt="Vue logo"
        />
      </a>
    </p>
    <h1>
      Vue Super 👉
      <a href="https://github.com/wangrongding" target="_blank">仓库</a>
    </h1>
    <router-link to="/testing" style="margin: 0 auto">go go go!</router-link>
  </div>
</template>

<style scoped lang="scss">
.page-container {
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
