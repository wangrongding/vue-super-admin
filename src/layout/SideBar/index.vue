<script setup lang="ts">
// @ts-ignore
import Menu from '@/layout/SideBar/Menu.tsx'
import Logo from './Logo.vue'
// import Menu from '@/layout/SideBar/menu.vue'

// 是否折叠菜单
const isCollapse = ref(false)
// 侧边栏的宽度
// const sidebarWidth = ref('200px')
const sidebarWidth = ref('unset')
// 折叠点击事件
function handleCollapseClick() {
  isCollapse.value = !isCollapse.value
}
</script>
<template>
  <div class="sidebar-container">
    <Logo :is-collapse="isCollapse" />
    <el-scrollbar max-height="100%">
      <Menu :is-collapse="isCollapse" />
    </el-scrollbar>
    <div class="collapse-button" @click="handleCollapseClick">
      <SvgIcon v-if="isCollapse" icon-name="Expand" color="#aaa" />
      <SvgIcon v-else icon-name="Fold" color="#aaa" />
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
