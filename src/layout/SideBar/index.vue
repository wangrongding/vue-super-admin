<script setup lang="ts">
import { reactive } from 'vue'
// @ts-ignore
import Menu from '@/layout/SideBar/Menu.tsx'

const router = useRouter()
const state = reactive({})
function goHome() {
  router.push('/')
}
</script>
<template>
  <div class="sidebar-container">
    <div class="logo" @click="goHome">
      <img src="@/assets/logo.png" alt="" class="logo-img" />
      <p class="logo-title">super-admin</p>
    </div>
    <Menu />
    <div class="collapse-button">
      <!-- <Fold style="font-size: 20px" /> -->
      <IconEpRefresh />
      折叠
    </div>
  </div>
</template>
<style lang="scss" scoped>
.sidebar-container {
  height: 100%;
  width: 200px;
  background-color: $base-sidebar-bg-color;
  box-shadow: 1px 1px 10px #00000010;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .logo {
    padding: 0 20px;
    height: 60px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .logo-img {
      width: 50px;
      height: 50px;
    }
  }

  .collapse-button {
    cursor: pointer;
    border-top: 1px solid #909ca755;
    height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin-top: auto;
  }
}
</style>
