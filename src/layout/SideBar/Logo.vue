<script setup lang="ts">
import logo from '@/assets/logo.png'

const title = 'SuperAdmin'

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
    required: true,
  },
})
</script>
<template>
  <router-link class="logo-link" to="/">
    <img :src="logo" class="logo-img" />
    <h1 v-if="!isCollapse" class="logo-title">{{ title }}</h1>
  </router-link>
</template>
<style lang="scss" scoped>
.logo-link {
  max-width: 200px;
  box-sizing: border-box;
  height: 60px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;

  .logo-img {
    width: 40px;
    height: 40px;
  }

  .logo-title {
    color: #47ba80;
    font-weight: bolder;
    font-size: 20px;
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  }
}
</style>
