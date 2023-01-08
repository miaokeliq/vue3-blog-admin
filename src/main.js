import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "@/router";
//引入elementplus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/assets/icon/iconfont.css";
const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
