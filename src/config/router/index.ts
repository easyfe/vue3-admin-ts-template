import { RouteConfig } from "types";
import Layout from "@/layout/index.vue";

const routers: RouteConfig[] = [
    {
        path: "/",
        redirect: "/login",
        meta: {
            sort: 100
        },
        component: Layout,
        children: [
            {
                path: "/index",
                name: "index",
                meta: {
                    title: "首页",
                    icon: "menu-home",
                    sort: 19,
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
        ]
    }
];

export default routers;
