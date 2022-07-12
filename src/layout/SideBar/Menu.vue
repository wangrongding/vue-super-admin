<script setup lang="ts">
import { reactive } from 'vue'
import { RouteRecordRaw, useRoute } from 'vue-router'
import { routerList } from '@/router/index.ts'
import { getParentPaths } from '@/router/utils.ts'
import './Menu.scss'

const routers = routerList
const route = useRoute()
// 默认高亮的菜单
const defaultActive = ref('/home')
// 获取激活的菜单
function getDefaultActive() {
  // 当前路由的父级路径
  const parentRoutes = getParentPaths(route.path, routerList)[0]
  defaultActive.value = parentRoutes?.path || route.path
}

// 监听路由变化
watch(
  () => route.path,
  () => {
    getDefaultActive()
  },
  { immediate: true },
)
const state = reactive({})
</script>
<template>
  <el-menu
    collapse="{props.isCollapse}"
    background-color="transparent"
    menu-trigger="hover"
    text-color="#000000"
    default-active="{defaultActive.value}"
    unique-opened="{true}"
    active-text-color="#027AFF"
    router="{true}"
  ></el-menu>
</template>
<style lang="scss" scoped>
.page-container {
}
</style>
