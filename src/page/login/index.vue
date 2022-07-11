<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({})
const router = useRouter()
</script>
<template>
  <div class="login-page-container">
    login

    <el-button type="primary" size="default" @click="router.push('/')">
      登录
    </el-button>
  </div>
</template>
<style lang="scss" scoped>
.login-page-container {
}
</style>
