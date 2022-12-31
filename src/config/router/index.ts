import { RouteConfig } from "types";

const routers: RouteConfig[] = [
    {
        path: "/index",
        name: "index",
        meta: {
            title: "功能配置",
            icon: "zx-1-1",
            sort: 9
        },
        component: () => import("@/views/index/index.vue")
    }
];

export default routers;
