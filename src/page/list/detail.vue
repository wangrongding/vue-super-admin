<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({})
</script>
<template>
  <div class="detail-container">
    detail detail detail detail detail detail detail detail detail detail detail
    detail detail detail detail detail detail detail detail detail detail detail
    detail detail detail detail detail detail detail detail detail detail

    <div style="border: 1px solid red; display: inline-block">
      <router-link to="/list/detail">返回子列表页面</router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.detail-container {
}
</style>
