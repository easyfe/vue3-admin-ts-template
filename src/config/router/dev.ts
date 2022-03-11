// Omit 删除指定类型的key返回删除后的接口类型
// import { RouteRecordRaw, RouteMeta } from "vue-router";
// import { Component } from "vue";
// export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
//     name: string;
//     meta: RouteMeta;
//     component?: Component | string;
//     components?: Component;
//     children?: AppRouteRecordRaw[];
//     props?: any;
//     fullPath?: string;
// }
import Main from "@/layout/main.vue";
const routers = [
    {
        path: "/dev",
        name: "dev",
        component: Main,
        meta: {
            title: "开发者中心",
            icon: "dev"
        },
        children: [
            {
                path: "/dev/test",
                name: "dev-test",
                meta: {
                    title: "测试"
                },
                component: (): any => import("@/views/dev/test/index.vue")
            }
        ]
    }
];

export default routers;
