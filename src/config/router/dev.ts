import { RouteConfig } from "types";
import LayoutMain from "@/layout/main.vue";

const routers: RouteConfig[] = [
    {
        path: "/dev",
        name: "dev",
        meta: {
            title: "开发者工具",
            icon: "zx-1-2",
            sort: 1
        },
        component: LayoutMain,
        children: [
            {
                path: "/dev/form",
                name: "dev-form",
                meta: {
                    title: "普通表单",
                    sort: 9
                },
                component: () => import("@/views/dev/form/index.vue")
            },
            {
                path: "/dev/modal-form",
                name: "dev-modal-form",
                meta: {
                    title: "弹窗表单",
                    sort: 8
                },
                component: () => import("@/views/dev/modal-form/index.vue")
            },
            {
                path: "/dev/table",
                name: "dev-table",
                meta: {
                    title: "普通表格",
                    sort: 7
                },
                component: () => import("@/views/dev/table/index.vue")
            },
            {
                path: "/dev/modal-table",
                name: "dev-modal-table",
                meta: {
                    title: "弹窗表格",
                    sort: 6
                },
                component: () => import("@/views/dev/modal-table/index.vue")
            }
        ]
    }
];

export default routers;
