<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title">用户登陆</div>
      <el-form :model="formData" :rules="rules" ref="formDataRef">
        <el-form-item prop="account">
          <el-input
            v-model="formData.account"
            placeholder="请输入账号"
            size="large"
          >
            <template #prefix>
              <span class="iconfont icon-account"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            size="large"
          >
            <template #prefix>
              <span class="iconfont icon-mima"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkCode">
          <div class="check-code-panel">
            <el-input
              v-model="formData.checkCode"
              placeholder="请输入验证码"
              class="input-panel"
              size="large"
            />
            <img
              :src="checkCodeUrl"
              alt=""
              class="check-code"
              @click="changeCheckCode"
            />
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="formData.rememberMe" :label="true"
            >记住密码</el-checkbox
          >
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" :style="{ width: '100%' }" @click="login">
            登陆
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const api = {
  checkCode: "api/checkCode",
};
const checkCodeUrl = ref(api.checkCode);
const changeCheckCode = () => {
  checkCodeUrl.value = api.checkCode + "?" + new Date().getTime();
};

//表单相关
const formDataRef = ref();
const formData = reactive({});
const rules = {
  account: [
    {
      required: true,
      message: "请输入用户名",
    },
  ],

  password: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
  checkCode: [
    {
      required: true,
      message: "请输入验证码",
    },
  ],
};
const login = () => {
  formDataRef.value.validate((valid) => {
    if (!valid) {
      return;
    }
  });
};
</script>

<style lang="scss">
.login-body {
  width: 100%;
  height: calc(100vh); //视窗高度的百分比（1vh代表视窗的高度为 1%）
  background-image: url(../assets/login-bg.jpg);
  background-size: cover;
  background-position: center;
  .login-panel {
    margin-top: 150px;
    border-radius: 5px;
    box-shadow: 2px 2px 10px #ddd;
    float: right;
    width: 350px;
    margin-right: 100px;
    padding: 20px;
    background: rgb(255, 255, 255, 0.8);
    .login-title {
      font-size: 18px;
      text-align: center;
      margin-bottom: 10px;
    }
    .check-code-panel {
      width: 100%;
      display: flex;
      align-items: center;
      .input-panel {
        flex: 1;
        margin-right: 5px;
      }
      .check-code {
        cursor: pointer;
      }
    }
  }
}
</style>
