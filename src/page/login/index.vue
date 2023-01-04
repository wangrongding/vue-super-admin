<script setup lang="ts">
import { FormOptions } from '@/components/SuperForm/index.vue'

const state = reactive({})

// 表单数据
const formParams: FormOptions = reactive({
  data: {}, // 表单数据对象
  formList: {
    username: {
      type: 'text',
      label: '用户名',
      placeholder: '请输入用户名',
    },
    password: {
      type: 'text',
      mode: 'password',
      label: '密码',
      placeholder: '请输入密码',
    },
  },

  labelWidth: '80px', // 表单标签宽度
})
const router = useRouter()
function submit() {
  // router.push('/')
}
function reset() {}
</script>
<template>
  <div class="login-page-container">
    <div class="login-form">
      <h1>Vue-Super-Admin</h1>

      <SuperForm ref="resetForm" :form-params="formParams">
        <template #reset>
          <el-button
            size="default"
            icon="RefreshRight"
            type="info"
            @click="reset"
          >
            重置
          </el-button>
        </template>
      </SuperForm>

      <div>
        <el-button type="primary" size="default" @click="submit">
          登录
        </el-button>
        <el-button type="primary" size="default" @click="submit">
          注册
        </el-button>
        <el-button type="primary" size="default" @click="submit">
          忘记密码
        </el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-page-container {
  background-color: #34495e;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .login-form {
    text-align: center;
    width: 400px;
    height: 400px;
    margin: 0 50px;
    background-color: black;
    border-radius: 10px;
    padding: 20px;

    // display: flex;
    // justify-content: center;
    // align-items: center;

    h1 {
      height: 50px;
      color: black;
    }
  }
}
</style>
