<script setup lang="ts">
import { useStore } from '@/store/index.ts'

const store = useStore()
</script>
<template>
  <el-button type="primary" size="default" @click="store.counter++">
    changeCount {{ store.counter }}
  </el-button>
</template>
<style lang="scss"></style>
