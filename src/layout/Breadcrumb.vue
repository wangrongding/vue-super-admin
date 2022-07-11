<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { ref, watch, Ref } from 'vue'
import { useRoute, RouteRecordRaw, RouteLocationMatched } from 'vue-router'
// 定义面包屑导航数据
const tabs: Ref<RouteLocationMatched[]> = ref([])
const route = useRoute()
const router = useRouter()
const getBreadcrumb = () => {
  // 获取所有有meta和title
  const matched = route.matched.filter((item) => item.meta && item.meta.title)
  // 设置面包屑导航数据
  tabs.value = matched
  const parentRoutes = getParentPaths(route.path, router.options.routes)
  // console.log('🚀🚀🚀 / matched', matched)
  // console.log('🚀🚀🚀 / route', route.path)
  // console.log('🚀🚀🚀 / parentRoutes', router.options.routes)
  // console.log('🚀🚀🚀 / parentRoutes', parentRoutes)
}
getBreadcrumb()
// 路由发生变化，重新获取面包屑导航数据
watch(
  () => route.path,
  () => getBreadcrumb(),
)

// =========================
// 深度遍历查找
function dfs(routes: RouteRecordRaw[], path: string, parents: string[]) {
  for (let i = 0; i < routes.length; i++) {
    const item = routes[i]
    // 找到path则返回父级path
    if (item.path === path) return parents
    // children不存在或为空则不递归
    if (!item.children || !item.children.length) continue
    // 往下查找时将当前path入栈
    parents.push(item.path)

    if (dfs(item.children, path, parents).length) return parents
    // 深度遍历查找未找到时当前path 出栈
    parents.pop()
  }
  // 未找到时返回空数组
  return []
}
// 通过path获取父级路径
function getParentPaths(path: string, routes: RouteRecordRaw[]) {
  return dfs(routes, path, [])
}
// =========================
</script>

<template>
  <div class="breadcrumb-container">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="item in tabs"
        :key="item.path"
        :to="{ path: item.path }"
      >
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb-container {
  margin: 10px 20px 0;
}
</style>
