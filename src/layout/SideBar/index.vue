<script setup lang="ts">
import { reactive } from 'vue'
// @ts-ignore
import Menu from '@/layout/SideBar/Menu.tsx'

const router = useRouter()
const state = reactive({})
function goHome() {
  router.push('/')
}
// 是否折叠菜单
const isCollapse = ref(false)
// 侧边栏的宽度
const sidebarWidth = ref('200px')
// 折叠点击事件
function handleCollapseClick() {
  isCollapse.value = !isCollapse.value
  if (isCollapse.value) {
    sidebarWidth.value = '70px'
  } else {
    sidebarWidth.value = '200px'
  }
}
</script>
<template>
  <div class="sidebar-container">
    <div class="logo" @click="goHome">
      <img src="@/assets/logo.png" alt="" class="logo-img" />
      <p class="logo-title">SuperAdmin</p>
    </div>
    <Menu :is-collapse="isCollapse" />
    <div class="collapse-button" @click="handleCollapseClick">
      <el-icon color="#00000080" :size="20">
        <i-ep-expand v-if="isCollapse" />
        <i-ep-fold v-else />
      </el-icon>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.sidebar-container {
  height: 100%;

  // stylelint-disable-next-line
  width: v-bind(sidebarWidth);
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

    .logo-title {
      color: #47ba80;
      font-weight: bolder;
      font-size: 20px;
      font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
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
