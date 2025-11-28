import envHelper from "@/utils/helper/env";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import piniaRoutes from "@/config/pinia/routes";
import type { RouteConfig } from "types";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
import typeHelper from "@/utils/helper/type";
import global from "@/config/pinia/global";
import { initGlobal } from "@/views/utils";
import { baseRouter } from "./base";
import { cloneDeep } from "lodash-es";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
    history: createWebHistory(envHelper.get("VITE_APP_BASE_ROUTE")),
    routes: [...baseRouter, ...routes]
});

let timer = 0;
let start = 0;

/**
 * 处理本地路由为菜单格式，主要针对多级嵌套路由和排序
 * @param routes
 * @returns
 */
const formatMenuShow = (routes: RouteConfig[]) => {
    const cloneData: RouteConfig[] = [];
    routes.sort((a, b) => (b.meta?.sort || 1) - (a.meta?.sort || 1));
    for (let i = 0; i < routes.length; i++) {
        const item = routes[i];
        if (!item) continue;
        //处理一级路由，从/释放出来
        if (!item.meta?.title && item.children?.length) {
            cloneData.push(...formatMenuShow(item.children));
            continue;
        }
        if (item.meta?.permission?.() === false) {
            continue;
        }
        //处理有父级路由的情况，主要是三级页面
        if (item.meta?.parentName) {
            const parent = routes.find((r) => r.name === item.meta?.parentName);
            if (parent) {
                parent.children = parent.children || [];
                parent.children.push(item);
            }
            continue;
        }
        if (item.children) {
            cloneData.push({
                ...item,
                children: formatMenuShow(item.children)
            } as RouteConfig);
        } else {
            cloneData.push(item);
        }
    }
    return cloneData;
};

/**
 * 初始化路由
 */
const initRoute = (): void => {
    piniaRoutes().routes = [];
    const staticRoutes = routes as RouteConfig[];
    const menuRoutes = formatMenuShow(cloneDeep(staticRoutes));
    const loop = (data: RouteConfig[]) => {
        data.forEach((item) => {
            if (item.children?.length) {
                if (typeof item.component !== "function") {
                    item.redirect = item.children[0]?.path;
                }
                loop(item.children);
            }
        });
    };
    loop(menuRoutes);
    piniaRoutes().routes = menuRoutes;
    console.log("初始化路由：", piniaRoutes().routes);
    // staticRoutes.forEach((item) => {
    //     router.addRoute(item as any);
    // });
};

/**
 * 获取默认路由
 * @returns
 */
const getDefaultRoute = (): RouteConfig | undefined => {
    const fn = (list: RouteConfig[]) => {
        let result: RouteConfig | undefined;
        for (const item of list) {
            if (item.meta?.permission?.() === false || item.meta?.hidden) {
                continue;
            }
            if (item.meta?.navTag || typeHelper.isFunction(item.component)) {
                result = item;
                break;
            }
            if (item.children) {
                result = fn(item.children);
                if (result) {
                    break;
                }
            }
        }
        return result;
    };
    const defualtRoute = fn(piniaRoutes().routes);
    return defualtRoute;
};

/**
 * 递归获取父级路由,主要用于面包屑展示
 * @param targetRoute
 * @returns
 */
const getRouteParent = (targetRoute?: any) => {
    const findParent = (data: RouteConfig[], target: RouteConfig, result: RouteConfig[]) => {
        for (const item of data) {
            if (item.name === target.name) {
                //将查找到的目标数据加入结果数组中
                result.unshift(item);
                return true;
            }
            if (item.children && item.children.length > 0) {
                //根据查找到的结果往上找父级节点
                const isFind = findParent(item.children, target, result);
                if (isFind) {
                    result.unshift(item);
                    return true;
                }
            }
        }
        //走到这说明没找到目标
        return false;
    };
    const result: RouteConfig[] = [];
    const currentRoute = router.currentRoute.value;
    findParent(piniaRoutes().routes, targetRoute || currentRoute.matched[currentRoute.matched.length - 1], result);
    return result;
};

//路由前置守卫
router.beforeEach(async (to: RouteConfig, from, next) => {
    // versionCheck();
    NProgress.start();
    // if (!piniaRoutes().routes.length) {
    //     initRoute();
    //     next({ ...to, replace: true });
    //     return;
    // }
    // console.log("路由前置守卫：", to, from);
    document.title = (to.meta?.title as string) || "";
    if (to.name === "login") {
        next();
        return;
    }
    if (!global().initSuccess) {
        await initGlobal();
    }
    if (to.meta?.permission?.() === false) {
        if (from.path === "/") {
            next(getDefaultRoute() || { name: "404" });
        } else {
            next({ name: "404" });
        }
        return;
    }

    start = new Date().getTime();
    /** 资源没有加载完成的时候，给loading，为防止资源已加载完毕，加上延迟避免闪屏 */
    timer = window.setTimeout(() => {
        if (envHelper.dev()) {
            console.warn(`执行路由定时器：${timer}`);
        }
        if (timer && envHelper.dev()) {
            document.getElementById("index-loading")?.setAttribute("style", "display:auto");
        }
    }, 500);
    if (from.meta?.keepAliveName) {
        let domV = "";
        if (from.meta?.scrollId) {
            domV = `${from.meta?.scrollId}`;
        } else {
            domV = `.frame-view-content`;
        }
        const $content = document.querySelector(domV);
        const scrollTop = $content?.scrollTop || 0;
        if (from.name) {
            global().SET_SCROLL({ name: from.name.toString(), value: scrollTop });
        }
    }
    //正常跳转
    next();
});

router.afterEach((to) => {
    if (envHelper.dev()) {
        console.warn(`路由耗时：${new Date().getTime() - start}，定时器：${timer}`);
    }
    if (timer) {
        if (envHelper.dev()) {
            console.warn(`清除路由定时器：${timer}`);
        }
        clearTimeout(timer);
        timer = 0;
    }
    document.getElementById("index-loading")?.setAttribute("style", "display:none");
    if (!to.meta.hidden || to.meta.navTag) {
        piniaRoutes().CREATE_NAVTAG(to);
    }
    NProgress.done();
});

export default router;
export { getDefaultRoute, getRouteParent, initRoute };
