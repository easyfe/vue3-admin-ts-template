import { createApp } from "vue";
import { createPinia } from "pinia";
import app from "./app.vue";
import router from "@/packages/vue-router/index";
/***************** 样式相关 ***************/
import "virtual:svg-icons-register";
//引入全局样式
import "@/styles/index.scss";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "@arco-design/web-vue/es/time-picker/style/css.js";

import i18n from "./locales";

/***************** vue相关 ***************/
//导入布局相关初始化处理
import "@/packages/init/index";
//引入全局自定义指令
import directive from "@/resources/directive";
//加载视频播放器
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";

declare global {
    interface Window {
        BMap: any;
    }
}

const App = createApp(app);

//解决国际化问题
import { Modal, Message } from "@arco-design/web-vue";
Modal._context = App._context;
Message._context = App._context;

App.use(createPinia());
App.use(router);
App.use(VuePlyr, {
    plyr: {}
});
App.use(ArcoVueIcon);
App.use(i18n);
Object.keys(directive).forEach((key) => {
    App.directive(key, directive[key]);
});
App.mount("#app");
