<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({})
</script>
<template>
  <div class="list-container">
    <router-link to="/list/detail" style="margin: 0 auto">
      go go go!
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
.list-container {
  padding: 200px;
  text-align: center;
}
</style>
