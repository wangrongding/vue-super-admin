<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const zIndex = 3000
const size: any = 'default'
</script>

<template>
  <el-config-provider :locale="zhCn" :size="size" :z-index="zIndex">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss"></style>
