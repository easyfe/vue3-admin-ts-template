/* 组合路由并导出
 * @Author: hanxinxin
 * @Date: 2021-04-21 13:00:54
 * @Last Modified by: hanxinxin
 * @Last Modified time: 2023-06-16 10:43:11
 */
import { RouteRecordRaw } from "vue-router";
import baseRouter from "./base";
import env from "@/utils/tools/env";

const modulesFiles: Record<string, any> = import.meta.globEager("/src/config/router/*.ts");
const modules: any = {};
for (const key in modulesFiles) {
    modules[key.replace("/src/config/router/", "").replace(".ts", "")] = modulesFiles[key].default;
}

const routers: any = [];

for (const key in modules) {
    if (key !== "dev") {
        routers.push(...modules[key]);
    }
}

if (modules?.dev && env.dev()) {
    routers.push(...modules.dev);
}

routers.push(...baseRouter);

export default routers as RouteRecordRaw[];
