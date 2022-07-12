<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({})
</script>
<template>
  <div class="detail-container">
    detail detail detail
    <div></div>
    <router-link to="/list/detail/test" style="margin: 0 auto">
      点击去详情的子页面
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
.detail-container {
}
</style>
