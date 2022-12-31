import { RouteConfig } from "types";
import LayoutMain from "@/layout/main.vue";

const routers: RouteConfig[] = [
    {
        path: "/index",
        name: "index",
        meta: {
            title: "功能配置",
            icon: "zx-1-1",
            sort: 9
        },
        component: LayoutMain,
        children: []
    }
];

export default routers;
