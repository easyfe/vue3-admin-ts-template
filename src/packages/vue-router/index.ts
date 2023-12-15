import envHelper from "@/utils/helper/env";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import piniaRoutes from "@/config/pinia/routes";
import { RouteConfig } from "types";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
import typeHelper from "@/utils/helper/type";
import { logout } from "@/views/utils";
import global from "@/config/pinia/global";
import storage from "@/utils/tools/storage";
import { usePermission } from "@/hooks/usePermission";
import { getVersion } from "@/config/apis/common";
import { Message } from "@arco-design/web-vue";

const { hasPermission, permissions } = usePermission();

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
    history: createWebHistory(envHelper.get("VITE_APP_BASE_ROUTE")),
    routes
});

let timer = 0;
let start = 0;

/**
 * 递归设置路由
 */
const initRoute = (): void => {
    const filterRoutes = (routes: RouteConfig[]) => {
        const cloneData: RouteConfig[] = [];
        routes.sort((a, b) => (b.meta?.sort || 1) - (a.meta?.sort || 1));
        for (let i = 0; i < routes.length; i++) {
            const item = routes[i];
            //处理一级路由，从/释放出来
            if (!item.meta?.title && item.children?.length) {
                cloneData.push(...filterRoutes(item.children));
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
                    children: filterRoutes(item.children)
                });
            } else {
                cloneData.push(item);
            }
        }
        return cloneData;
    };
    const staticRoutes = routes as RouteConfig[];
    const filterRoutesRes = filterRoutes(staticRoutes);
    piniaRoutes().SET_ROUTES(filterRoutesRes);
};

/**
 * 获取默认路由
 * @returns
 */
const getDefaultRoute = (): RouteConfig | undefined => {
    const fn = (list: RouteConfig[]) => {
        let result: RouteConfig | undefined;
        for (const item of list) {
            if (item.meta?.navTag || (!item.meta?.hidden && typeHelper.isFunction(item.component))) {
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
    return fn(piniaRoutes().routes);
};

/**
 * 递归获取父级路由
 * @param targetRoute
 * @returns
 */
const getRouteParent = (targetRoute?: any) => {
    function findParent(data: RouteConfig[], target: RouteConfig, result: RouteConfig[]) {
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
    }
    const result: RouteConfig[] = [];
    const currentRoute = router.currentRoute.value;
    findParent(piniaRoutes().routes, targetRoute || currentRoute.matched[currentRoute.matched.length - 1], result);
    return result;
};

/**
 * 全局初始化
 * @returns
 */
const initGlobal = (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        // if (!storage.getToken()) {
        //     logout();
        //     return;
        // }
        //TODO:获取用户权限信息，填充到permissions里面
        // console.log("初始化全局数据", hasPermission("system:menu:edit"));
        global().initSuccess = true;
        resolve(true);
    });
};

// 版本监控
const versionCheck = async () => {
    if (envHelper.dev() || __APP_UPLOAD__) return;
    const response = await getVersion();
    if (String(__APP_VERSION__) !== String(response.version)) {
        console.log("APP_VERSION", String(__APP_VERSION__), "====", String(response.version));
        Message.info({
            content: "发现新内容，自动更新中...",
            duration: 1500,
            onClose: () => {
                window.location.reload();
            }
        });
    }
};

//路由前置守卫
router.beforeEach(async (to: RouteConfig, from, next) => {
    versionCheck();
    NProgress.start();
    if (!piniaRoutes().routes.length) {
        initRoute();
        next({ ...to, replace: true });
        return;
    }
    if (to.name === "login") {
        next();
        return;
    }
    if (!global().initSuccess) {
        await initGlobal();
    }
    if (to.meta?.permission?.() === false) {
        next({ name: "404" });
        return;
    }
    // console.log("路由前置守卫：", to, from);
    document.title = <string>to.meta?.title || "";
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
