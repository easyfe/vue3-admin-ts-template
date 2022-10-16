import { RouteConfig } from "@/types";
import LayoutMain from "@/layout/main.vue";

const routers: RouteConfig[] = [
    {
        path: "/index",
        name: "index",
        meta: {
            title: "功能配置",
            icon: "left-menu-2",
            sort: 9
        },
        component: LayoutMain,
        children: []
    }
];

export default routers;
