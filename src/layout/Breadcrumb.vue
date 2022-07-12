<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { ref, watch, Ref } from 'vue'
import { useRoute, RouteRecordRaw, RouteLocationMatched } from 'vue-router'
import { routerList } from '@/router/index.ts'
import { getParentPaths } from '@/router/utils.ts'

// 定义面包屑导航数据
const tabs: Ref<RouteRecordRaw[]> = ref([])
const route = useRoute()
const getBreadcrumb = () => {
  // 获取所有有meta和title
  const matched = route.matched.filter((item) => item.meta && item.meta.title)
  // 获取父路由
  const parentRoutes = getParentPaths(route.path, routerList)
  // 设置面包屑导航数据
  tabs.value = parentRoutes.concat(matched)
}
// 路由发生变化，重新获取面包屑导航数据
watch(
  () => route.path,
  () => getBreadcrumb(),
)
getBreadcrumb()
</script>

<template>
  <div class="breadcrumb-container">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="item in tabs"
        :key="item.path"
        :to="{ path: item.path }"
      >
        {{ item.meta!.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb-container {
  margin: 10px 20px 0;
}
</style>
