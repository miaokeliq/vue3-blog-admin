<template>
  <div class="layout">
    <el-container>
      <el-header class="header">
        <div class="logo">EasyBlog</div>
        <div class="user-info">
          <span>欢迎回来，</span>
          <el-dropdown>
            <span>
              <span class="nick-name">
                {{ userInfo.nickName }}
                <span class="iconfont icon-close"></span>
              </span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="avatar">
            <img :src="userInfo.avatar" />
          </div>
        </div>
      </el-header>
      <el-container class="container">
        <el-aside width="200px" class="left-aside">
          <div>
            <el-button class="post-btn"> 发布 </el-button>
          </div>
          <div class="menu-panel">
            <ul>
              <li v-for="(menu, index) in menuList" :key="index">
                <span class="menu-title-p" @click="openClose(index)">
                  <span :class="['iconfont', menu.icon]"></span>
                  <span class="menu-title">{{ menu.title }}</span>
                  <span
                    :class="[
                      'iconfont',
                      'open-close',
                      menu.open ? 'icon-close' : 'icon-open',
                    ]"
                  ></span>
                </span>

                <ul class="sub-menu" v-show="menu.open">
                  <li v-for="(subMenu, index) in menu.children" :key="index">
                    <router-link
                      :to="subMenu.path"
                      :class="[
                        'sub-menu-item',
                        activePath == subMenu.path ? 'active' : '',
                      ]"
                      >{{ subMenu.title }}</router-link
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </el-aside>
        <el-main class="right-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, watch } from "vue";
import VueCookies from "vue-cookies";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const menuList = ref([
  {
    title: "博客",
    icon: "icon-blog",
    open: true,
    children: [
      {
        title: "博客管理",
        path: "/blog/list",
      },
      {
        title: "分类管理",
        path: "/blog/category",
      },
    ],
  },
  {
    title: "专题",
    icon: "icon-zhuanti",
    open: true,
    children: [
      {
        title: "专题管理",
        path: "/special/category",
      },
    ],
  },
  {
    title: "设置",
    icon: "icon-settings",
    open: true,
    children: [
      {
        title: "个人信息设置",
        path: "/settings/my",
      },
      {
        title: "博客成员",
        path: "/settings/user",
      },
      {
        title: "系统设置",
        path: "/settings/sysSetting",
      },
    ],
  },
  {
    title: "回收站",
    icon: "icon-delete",
    open: true,
    children: [
      {
        title: "回收站",
        path: "/recovery/list",
      },
    ],
  },
]);

const openClose = (index) => {
  const open = menuList.value[index].open;
  menuList.value[index].open = !open;
};

const userInfo = ref({});

// 初始化的时候获取用户的cookie信息
const init = () => {
  userInfo.value = VueCookies.get("userInfo");
  userInfo.value.avatar = proxy.globalInfo.imageUrl + userInfo.value.avatar;
};
init();
// 监听路由的变化

const activePath = ref(null);

watch(
  route,
  (newVal, oldVal) => {
    activePath.value = newVal.path;
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss">
.layout {
  .header {
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      font-size: 30px;
    }
    .user-info {
      display: flex;
      align-items: center;
      .nick-name {
        cursor: pointer;
        color: rgb(6, 143, 234);

        .icon-close {
          font-size: 14px;
        }
      }
      .avatar {
        margin-left: 10px;
        width: 50px;
        img {
          width: 100%;
          border-radius: 25px;
        }
      }
    }
  }
  .container {
    background-color: #f5f6f7;
    height: calc(100vh - 60px);
    padding-top: 10px;
    .left-aside {
      width: 280px;
      padding: 0px 15px;
      .post-btn {
        background-color: green;
        color: #fff;
        height: 40px;
        width: 100%;
      }
      .menu-panel {
        margin-top: 5px;
        ul,
        li {
          padding: 0px;
          margin: 0px;
          list-style: none;
        }
        .menu-title-p {
          padding: 0px 5px;
          display: flex;
          cursor: pointer;
          line-height: 45px;
          .iconfont {
            font-size: 18px;
            color: #91949a;
          }
          .menu-title {
            flex: 1;
            color: #3f4042;
            margin-left: 10px;
          }
          .open-close {
            width: 20px;
            font-size: 16px;
          }
        }

        .menu-title-p:hover {
          background-color: #ddd;
        }
        .sub-menu {
          font-size: 14px;
          .sub-menu-item {
            padding: 0px 10px 0 33px;
            display: block;
            line-height: 40px;
            cursor: pointer;
            text-decoration: none;
            color: #3f4042;
          }
          .sub-menu-item:hover {
            background-color: #ddd;
            color: red;
          }
          .active {
            background-color: #ddd;
            color: red;
          }
        }
      }
    }
    .right-main {
      background: #fff;
    }
  }
}
</style>
