<script setup lang="ts">
import { reactive } from 'vue'

const router = useRouter()
const state = reactive({})
function logout() {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    // TODO 登出接口？
    router.push('/login')
  })
}
</script>
<template>
  <div class="nav-bar-container">
    <div class="nav-left"></div>
    <div class="nav-right">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        cover
      />
      <p class="user-name">super-admin</p>
      <div class="logout-btn" @click="logout">
        <i-material-symbols-logout />
        <span>退出</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.nav-bar-container {
  padding: 0 20px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: $base-navbar-bg-color;
  box-shadow: 1px 2px 5px #00000010;

  .nav-left {
    display: flex;
    align-items: center;
    cursor: pointer;

    .logo {
      width: 50px;
      height: 50px;
    }

    .logo-title {
      margin-left: 10px;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .nav-right {
    display: flex;
    align-items: center;
    cursor: pointer;

    .logout-btn {
      margin-left: 20px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
}
</style>
