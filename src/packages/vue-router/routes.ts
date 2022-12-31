/* 组合路由并导出
 * @Author: hanxinxin
 * @Date: 2021-04-21 13:00:54
 * @Last Modified by: hanxinxin
 * @Last Modified time: 2022-08-29 11:29:40
 */
import { RouteRecordRaw } from "vue-router";
import baseRouter from "./base";
import env from "@/utils/tools/env";
import Layout from "@/layout/index.vue";

const modulesFiles = import.meta.globEager("/src/config/router/*.ts");
const modules: any = {};
for (const key in modulesFiles) {
    modules[key.replace("/src/config/router/", "").replace(".ts", "")] = modulesFiles[key].default;
}

const routers = [
    {
        path: "/",
        name: "",
        redirect: "/index",
        component: Layout,
        children: [] as any[]
    }
] as any[];

for (const key in modules) {
    if (key !== "dev") {
        routers[0].children.push(...modules[key]);
    }
}

if (modules?.dev && env.dev()) {
    routers[0].children.push(...modules.dev);
}

routers.push(...baseRouter);

export default routers as RouteRecordRaw[];
