import { RouteConfig } from "types";
import Layout from "@/layout/index.vue";

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
                path: "/dev/pages/lv1",
                name: "dev-pages-lv1",
                meta: {
                    title: "多级页面缓存",
                    sort: 5
                },
                component: () => import("@/views/dev/pages/lv1/index.vue")
            },
            {
                path: "/dev/pages/lv2",
                name: "dev-pages-lv2",
                meta: {
                    title: "二级页面",
                    parentName: "dev-pages-lv1",
                    hidden: true,
                    navTag: true,
                    sort: 5
                },
                component: () => import("@/views/dev/pages/lv2/index.vue")
            },
            {
                path: "/dev/pages/lv3",
                name: "dev-pages-lv3",
                meta: {
                    title: "三级页面缓存",
                    parentName: "dev-pages-lv2",
                    hidden: true,
                    navTag: true,
                    keepAliveName: "DevPagesLv3",
                    sort: 5
                },
                component: () => import("@/views/dev/pages/lv3/index.vue")
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
