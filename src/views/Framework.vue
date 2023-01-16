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
                <span :class="['iconfont', menu.icon]"></span>
                <span>{{ menu.title }}</span>
                <ul>
                  <li v-for="(subMenu, index) in menu.children" :key="index">
                    {{ subMenu.title }}
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
const menuList = reactive([
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
      width: 250px;
      padding: 0px 15px;
      .post-btn {
        background-color: green;
        color: #fff;
        height: 40px;
        width: 100%;
      }
      .menu-panel {
        ul,
        li {
          padding: 0px;
          margin: 0px;
          list-style: none;
        }
      }
    }
    .right-main {
      background: #fff;
    }
  }
}
</style>
