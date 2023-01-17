<template>
  <div class="layout">
    <el-container>
      <el-header class="header">Header</el-header>
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
                    <span class="sub-menu-item">{{ subMenu.title }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </el-aside>
        <el-main class="right-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
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
</script>

<style lang="scss">
.layout {
  .header {
    border-bottom: 1px solid #ddd;
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
          }
          .sub-menu-item:hover {
            background-color: #ddd;
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
