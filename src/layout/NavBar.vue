<script setup lang="ts">
import { reactive } from 'vue'
// import avatar from '@/assets/avatar.png'
// import avatar from '@/assets/avatar.gif'
// <img src="https://assets.fedtop.com/picbed/202211091418920.gif"/>

const avatar = 'https://assets.fedtop.com/picbed/202211091418920.gif'
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
      <el-dropdown size="default">
        <div class="user-operation-bar">
          <el-avatar :src="avatar" cover />
          <p class="user-name">super-admin</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item divided>
              <i-wpf-password1 />
              <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              <i-material-symbols-logout />
              <span>退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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

    .user-operation-bar {
      display: flex;
      align-items: center;
    }

    .user-name {
      margin-left: 10px;
      color: $base-color-default;
    }
  }
}
</style>
