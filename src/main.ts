import { createApp } from "vue";
import { createPinia } from "pinia";
import app from "./App.vue";
import router from "@/packages/vue-router/index";
/***************** 样式相关 ***************/
import "virtual:svg-icons-register";
//通用字体
import "vfonts/Lato.css";
//等宽字体
import "vfonts/FiraCode.css";
//引入全局样式
import "@/styles/index.scss";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";

/***************** vue相关 ***************/
//导入布局相关初始化处理
import "@/packages/init/index";
//引入全局自定义指令
import directive from "@/resources/directive";
import VueDOMPurifyHTML from "vue-dompurify-html";
//加载视频播放器
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";

const App = createApp(app);
App.use(createPinia());
App.use(router);
App.use(VueDOMPurifyHTML);
App.use(VuePlyr, {
    plyr: {}
});
App.use(ArcoVueIcon);
Object.keys(directive).forEach((key) => {
    App.directive(key, directive[key]);
});
App.mount("#app");
