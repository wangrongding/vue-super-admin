<script setup lang="ts">
/* 

// 需要在main.ts中引入以下
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 并全局挂载所有图标
Object.keys(ElementPlusIconsVue).forEach((key) => {
  app.component(
    key,
    ElementPlusIconsVue[key as keyof typeof ElementPlusIconsVue],
  )
})

*/
defineProps({
  icon: {
    type: String,
    default: '',
    required: true,
  },
  color: {
    type: String,
    default: '#00000080',
  },
  size: { type: Number, default: 20 },
})
</script>
<template>
  <div class="icon-container">
    <el-icon :color="color" :size="size">
      <component :is="icon"></component>
    </el-icon>
  </div>
</template>
