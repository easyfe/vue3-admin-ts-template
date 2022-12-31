import { RouteConfig } from "types";
import LayoutMain from "@/layout/main.vue";

const routers: RouteConfig[] = [
    {
        path: "/dev",
        name: "dev",
        meta: {
            title: "开发者工具",
            icon: "zx-1-2",
            sort: 9
        },
        component: LayoutMain,
        children: [
            {
                path: "/dev/form",
                name: "dev-form",
                meta: {
                    title: "表单",
                    sort: 9
                },
                component: () => import("@/views/dev/form/index.vue")
            }
        ]
    }
];

export default routers;
