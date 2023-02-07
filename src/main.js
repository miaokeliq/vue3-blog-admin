import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "@/router";
//引入elementplus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/assets/icon/iconfont.css";

//把封装的request定义成全局的
import Request from "@/utils/Request";

// message定义为全局
import message from "@/utils/Message";

// 引入自己封装的table组件
import Table from "@/components/Table.vue";
// 全局引入图片封面组件
import Cover from "@/components/Cover.vue";
import Dialog from "@/components/Dialog.vue";
import CoverUpload from "@/components/CoverUpload.vue";
const app = createApp(App);
app.use(router);
app.use(ElementPlus);
// 一个用于注册能够被应用内所有组件实例访问到的全局 property 的对象
app.config.globalProperties.Request = Request;
app.config.globalProperties.message = message;
app.config.globalProperties.globalInfo = {
  imageUrl: "/api/file/getImage/",
};
app.component("Table", Table);
app.component("Cover", Cover);
app.component("Dialog", Dialog);
app.component("CoverUpload", CoverUpload);
app.mount("#app");
