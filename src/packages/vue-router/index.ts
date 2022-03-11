// import Vue from "vue";
// import VueRouter from "vue-router";
// import routes from "./routes";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";
// import { logout } from "@/utils/tools/logout";
// import store from "@/packages/vuex";

// Vue.use(VueRouter);
// const VueRouterPush = VueRouter.prototype.push;
// const VueRouterReplace = VueRouter.prototype.replace;
// VueRouter.prototype.push = function push(location: string): any {
//     return (VueRouterPush.call(this, location) as any).catch((err: any) => err);
// };

// VueRouter.prototype.replace = function replace(location: any): any {
//     return (VueRouterReplace.call(this, location) as any).catch((err: any) => err);
// };

// //定义路由
// const router = new VueRouter({
//     mode: "hash",
//     base: "admin"
// });

// //动态加载路由
// router.addRoutes(routes);

// // 配置NProgress进度条选项 —— 进度环显示隐藏
// NProgress.configure({ showSpinner: false });

// //路由前置守卫
// //TODO:此处的to的类型不应该是any，应该是Route，但是和下面的next类型冲突，待优化
// router.beforeEach((to: any, from, next) => {
//     NProgress.start();
//     document.title = (to.meta && to.meta.title) || "";
//     if (to.name === "logout") {
//         logout();
//     } else if (store.state.permissionMenu.length === 0) {
//         store.commit("SET_ROUTES", routes);
//         // const base = routes.filter((item) => item.name === "Index")[0].children;
//         // store.commit("SET_ROUTES", base);
//         // store.commit("SET_ROUTES", base.concat(permissionRoutes));
//         next({ ...to, replace: true });
//     } else {
//         next();
//     }
// });

// router.afterEach((to) => {
//     NProgress.done();
//     store.commit("ADD_NAVTAG", to);
//     if (store.state.isMobile) {
//         store.commit("SET_COLLAPSE", false);
//     }
// });

// export default router;

import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 配置NProgress进度条选项 —— 进度环显示隐藏
NProgress.configure({ showSpinner: false });

//路由前置守卫
router.beforeEach((to, from, next) => {
    NProgress.start();
    document.title = (to.meta?.title as string) || "";
    next();
    // if (to.name === "logout") {
    //     logout();
    // } else if (store.state.permissionMenu.length === 0) {
    //     store.commit("SET_ROUTES", routes);
    //     next({ ...to, replace: true });
    // } else {
    //     next();
    // }
});

router.afterEach((to) => {
    console.log("路由：", to);
    NProgress.done();
    // store.commit("ADD_NAVTAG", to);
    // if (store.state.isMobile) {
    //     store.commit("SET_COLLAPSE", false);
    // }
});

export default router;
