import { RouteConfig } from "types";

const routers: RouteConfig[] = [
    {
        path: "/index",
        name: "index",
        meta: {
            title: "首页",
            icon: "zx-1-1",
            sort: 9,
            keepAliveName: "AppIndex"
        },
        component: () => import("@/views/index/index.vue")
    },
    {
        path: "/redirect",
        name: "redirect",
        meta: {
            title: "redirect",
            icon: "zx-1-1",
            sort: 9,
            hidden: true
        },
        component: () => import("@/views/redirect/index.vue")
    }
];

export default routers;
