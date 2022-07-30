<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { ref, watch, Ref } from 'vue'
import { useRoute, RouteRecordRaw, RouteLocationMatched } from 'vue-router'
import { routerList } from '@/router/index'
import { getParentPaths } from '@/router/utils'

const router = useRouter()
const route = useRoute()
// 定义面包屑导航数据
const tabs: Ref<RouteRecordRaw[]> = ref([])

// 获取面包屑导航数据
const getBreadcrumb = () => {
  // 获取所有有meta和title
  const matched = route.matched.filter((item) => item.meta && item.meta.title)
  // 获取父路由
  const parentRoutes = getParentPaths(route.path, routerList)
  // 设置面包屑导航数据
  tabs.value = parentRoutes.concat(matched as RouteRecordRaw[])
}
// 路由发生变化，重新获取面包屑导航数据
watch(
  () => route.path,
  (newRoute, oldRoute) => getBreadcrumb(),
)
getBreadcrumb()

function toTarget(route: RouteRecordRaw): void {
  if (route.meta!.type === 'single') {
    router.push(route.path)
  }
}
</script>

<template>
  <div class="breadcrumb-container">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in tabs" :key="item.path">
        <a
          v-if="item.meta!.type === 'single' && index < tabs.length"
          @click.prevent="toTarget(item)"
        >
          {{ item.meta!.title }}
        </a>
        <span
          v-else
          :style="{
            fontWeight: index === 0 ? 'bold' : 'normal',
            color:
              index === 0
                ? 'var(--el-text-color-primary)'
                : 'var(--el-text-color-regular)',
          }"
        >
          {{ item.meta!.title }}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb-container {
  margin: 10px 20px 0;
}
</style>
