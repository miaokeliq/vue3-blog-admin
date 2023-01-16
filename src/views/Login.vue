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
            type="password"
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
              @keyup.enter="login"
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
import { ref, reactive, getCurrentInstance } from "vue";
import VueCookies from "vue-cookies";
import md5 from "js-md5";
import { useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const api = {
  checkCode: "api/checkCode",
  login: "login",
};
const checkCodeUrl = ref(api.checkCode);
console.log(checkCodeUrl);
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

const init = () => {
  const loginInfo = VueCookies.get("loginInfo");
  if (!loginInfo) {
    return;
  }

  Object.assign(formData, loginInfo);
  console.log(formData);
};
init();

const login = () => {
  formDataRef.value.validate(async (valid) => {
    // console.log(valid); // true or false
    if (!valid) {
      return;
    }

    let cookieLoginInfo = VueCookies.get("loginInfo");
    let cookiePassword =
      cookieLoginInfo == null ? null : cookieLoginInfo.password;

    if (formData.password !== cookiePassword) {
      formData.password = md5(formData.password);
    }

    let params = {
      account: formData.account,
      password: formData.password,
      checkCode: formData.checkCode,
      rememberMe: formData.rememberMe,
    };
    let result = await proxy.Request({
      url: api.login,
      params: params,
      errorCallback: () => {
        changeCheckCode();
      },
    });
    if (!result) {
      return;
    }

    proxy.message.success("登陆成功");

    setTimeout(() => {
      router.push("/");
    }, 1500);

    const loginInfo = {
      account: params.account,
      password: params.password,
      rememberMe: params.rememberMe,
    };

    VueCookies.set("userInfo", result.data, 0);

    if (formData.rememberMe) {
      VueCookies.set("loginInfo", loginInfo, "7D");
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
