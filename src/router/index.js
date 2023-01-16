import { createRouter, createWebHistory } from "vue-router";
import VueCookies from "vue-cookies";

const routes = [
  {
    name: "登陆",
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    name: "框架页",
    path: "/",
    component: () => import("../views/Framework.vue"),
  },
];

//这里不是通过new来创建，通过createRouter 方法创建，使用的模式不是通过mode来定义
const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  const userInfo = VueCookies.get("userInfo");
  if (!userInfo && to.path != "/login") {
    router.push("/login");
  }
  next();
});

export default router;
