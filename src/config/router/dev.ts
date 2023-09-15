import { RouteConfig } from "types";
import Layout from "@/layout/index.vue";
import LayoutMain from "@/layout/main.vue";

const routers: RouteConfig[] = [
    {
        path: "/dev",
        name: "dev",
        meta: {
            title: "开发者工具",
            icon: "menu-dev",
            sort: 2
        },
        redirect: "/dev/form",
        component: Layout,
        children: [
            {
                path: "/dev/form",
                name: "dev-form",
                meta: {
                    title: "普通表单",
                    sort: 9,
                    keepAliveName: "DevForm"
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
            },
            {
                path: "/dev/echarts",
                name: "dev-echarts",
                meta: {
                    title: "Echarts图表",
                    sort: 6
                },
                component: () => import("@/views/dev/echarts/index.vue")
            },
            {
                path: "/dev/hide-menu/index",
                name: "dev-hide-menu-index",
                meta: {
                    title: "列表跳详情",
                    sort: 5
                },
                redirect: "/dev/hide-menu/index",
                component: LayoutMain,
                children: [
                    {
                        path: "/dev/hide-menu/index",
                        name: "dev-hide-menu-index",
                        meta: {
                            hidden: true,
                            navTag: true
                        },
                        component: () => import("@/views/dev/hide-menu/index/index.vue")
                    },
                    {
                        path: "/dev/hide-menu/detail",
                        name: "dev-hide-menu-detail",
                        meta: {
                            title: "详情菜单",
                            hidden: true,
                            navTag: true
                        },
                        component: () => import("@/views/dev/hide-menu/detail/index.vue")
                    }
                ]
            },
            {
                path: "/dev/count-up",
                name: "dev-count-up",
                meta: {
                    title: "滚动数字",
                    sort: 4
                },
                component: () => import("@/views/dev/count-up/index.vue")
            },
            {
                path: "/dev/drag",
                name: "dev-drag",
                meta: {
                    title: "自由拖拽",
                    sort: 4
                },
                component: () => import("@/views/dev/drag/index.vue")
            },
            {
                path: "/dev/new-drag",
                name: "dev-new-drag",
                meta: {
                    title: "重构自由拖拽",
                    sort: 4
                },
                component: () => import("@/views/dev/new-drag/index.vue")
            }
        ]
    }
];

export default routers;
