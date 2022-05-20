<script setup lang="ts">
import { useStore } from '@/store/index.ts'

const store = useStore()
</script>
<template>
  <div class="page-container">
    <el-button type="primary" size="default" @click="store.counter++">
      changeCount: {{ store.counter }}
    </el-button>
    <router-link to="/" style="margin: 0 auto">go go go!</router-link>
  </div>
</template>
<style lang="scss">
.page-container {
  padding: 200px;
  text-align: center;
}
</style>
