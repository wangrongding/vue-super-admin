<script setup lang="ts">
import NavBar from '@/layout/NavBar.vue'
import SideBar from '@/layout/SideBar/index.vue'
import Breadcrumb from '@/layout/Breadcrumb.vue'

const route = useRoute()
onMounted(() => {
  // // 禁止右键菜单
  // document.oncontextmenu = () => false
  // // oncopy事件禁用复制;
  // document.oncopy = () => false
  // // oncut事件禁用剪切
  // document.oncut = () => false
  // // onselectstart事件禁用网页上选取的内容
  // document.onselectstart = () => false
})
</script>
<template>
  <div class="app-container">
    <SideBar class="left" />
    <div class="right">
      <NavBar />
      <Breadcrumb />
      <div class="main">
        <!-- TODO 切换动画 -->
        <!-- <Transition name="fade" mode="out-in" appear>
          <router-view />
        </Transition> -->
        <router-view :key="route.path" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  user-select: none;
  height: 100vh;
  display: flex;
  flex-direction: row;
  background-color: $base-app-container-bg-color;

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    // 内容区域
    .main {
      margin: 10px 20px 20px;
      padding: 20px;
      border-radius: 10px;
      position: relative;
      background: #282c34;
      overflow-y: auto;

      // flex: 1; // main区域占满右侧区域
    }
  }
}
</style>
