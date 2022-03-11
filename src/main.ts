import { createApp } from "vue";
import app from "./app.vue";
import router from "@/packages/vue-router/index";
import "virtual:svg-icons-register";
// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";

createApp(app).use(router).mount("#app");
