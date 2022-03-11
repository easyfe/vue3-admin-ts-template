const baseRouter = [
    // {
    //     path: "/login",
    //     name: "login",
    //     meta: {
    //         title: "登录",
    //         hidden: true
    //     },
    //     component: (): any => import(/* webpackChunkName: "modules/base" */ "@/views/login/index.vue")
    // },
    // {
    //     path: "/logout",
    //     name: "Logout",
    //     meta: {
    //         title: "退出",
    //         icon: "switch-filling"
    //     }
    // },
    {
        path: "/:pathMatch(.*)*",
        name: "404",
        meta: {
            title: "找不到页面",
            hidden: true
        },
        component: (): any => import("@/views/404/index.vue")
    }
];

export default baseRouter;
