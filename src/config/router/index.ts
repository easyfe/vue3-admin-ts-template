import { RouteConfig } from "types";
import Layout from "@/layout/index.vue";

const routers: RouteConfig[] = [
    {
        path: "/index",
        redirect: "/index",
        meta: {
            title: "首页",
            icon: "menu-home",
            sort: 9
        },
        component: Layout,
        children: [
            {
                path: "/index",
                name: "index",
                meta: {
                    sort: 1,
                    keepAliveName: "AppIndex",
                    hidden: true,
                    navTag: true
                },
                component: () => import("@/views/index/index.vue")
            }
        ]
    },
    {
        path: "/redirect",
        redirect: "/redirect",
        component: Layout,
        children: [
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
